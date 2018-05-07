import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as multer from 'multer';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';
import * as admin from 'firebase-admin';
import * as socketIo from 'socket.io';
import UserController from './controller/UserController';
// import EventController from './controller/EventController';
import TripController from './controller/TripController';
// import OptionsController from './controller/OptionsController';
import ConversationController from './controller/ConversationController';


export let UPLOAD_PATH = "uploads";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
})

export let upload = multer({ storage: storage });

let serviceAccount = require("../chelpa-sms-verification-firebase-adminsdk-whx5g-839fd5c1ae.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chelpa-sms-verification.firebaseio.com"
});

const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    !req.cookies.__session) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  }
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  });
};

class Server {
  // set app to be of type express.Application
  public app: express.Application;


  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }




  // application config
  public config(): void {

    let urlOpenShift = '127.0.0.1:27017/' + process.env.OPENSHIFT_chelpa;
    // const MONGO_URI: string = 'mongodb+srv://ramin_sabet:NmMnNmMn@gettingstarted-hgi96.mongodb.net/chalpa'
    // const MONGO_URI: string = 'mongodb://127.0.0.1:27017/chelpa';
    const MONGO_URI: string = 'mongodb://ramin_sabet:NmMnNmMn@gettingstarted-shard-00-00-hgi96.mongodb.net:27017,gettingstarted-shard-00-01-hgi96.mongodb.net:27017,gettingstarted-shard-00-02-hgi96.mongodb.net:27017/chelpa?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';
    if (process.env.OPENSHIFT_MONGO_URI) {
      console.log("HI");
      urlOpenShift = process.env.OPENSHIFT_MONGO_URI +
        process.env.OPENSHIFT_chelpa;
    }

    mongoose.connect(MONGO_URI || urlOpenShift, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected to MongoDB');
      }
    });

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });

  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();
    // this.app.use(validateFirebaseIdToken);
    this.app.use('/', router);
    // this.app.use('/api/v1/options', OptionsController);
    // this.app.use('/api/v1/events', EventController);
    this.app.use('/api/v1/trips', TripController);
    this.app.use('/api/v1/users', UserController);
    this.app.use('/api/v1/chats', ConversationController);
  }
}

// export test
export default new Server().app;