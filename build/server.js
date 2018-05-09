"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var express = require("express");
var multer = require("multer");
var helmet = require("helmet");
var mongoose = require("mongoose");
var logger = require("morgan");
var admin = require("firebase-admin");
var UserController_1 = require("./controller/UserController");
// import EventController from './controller/EventController';
var TripController_1 = require("./controller/TripController");
// import OptionsController from './controller/OptionsController';
var ConversationController_1 = require("./controller/ConversationController");
exports.UPLOAD_PATH = "uploads";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
exports.upload = multer({ storage: storage });
var serviceAccount = require("../chelpa-sms-verification-firebase-adminsdk-whx5g-839fd5c1ae.json");
var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chelpa-sms-verification.firebaseio.com"
});
var validateFirebaseIdToken = function (req, res, next) {
    console.log('Check if request is authorized with Firebase ID token');
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !req.cookies.__session) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.', 'Make sure you authorize your request by providing the following HTTP header:', 'Authorization: Bearer <Firebase ID Token>', 'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }
    var idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    }
    admin.auth().verifyIdToken(idToken).then(function (decodedIdToken) {
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
    }).catch(function (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    });
};
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    // application config
    Server.prototype.config = function () {
        // let urlOpenShift = process.env.MONGODB_PORT_27017_TCP_ADDR + '/' + process.env.MONGODB_SERVICE_PORT;
        //  const MONGO_URI: string = 'mongodb+srv://ramin_sabet:NmMnNmMn@gettingstarted-hgi96.mongodb.net/chalpa'
        var MONGO_URI = 'mongodb://http://nodejs-mongo-persistent-chelpa.193b.starter-ca-central-1.openshiftapps.com:27017/chelpa';
        // const MONGO_URI: string = 'mongodb://ramin_sabet:NmMnNmMn@gettingstarted-shard-00-00-hgi96.mongodb.net:27017,gettingstarted-shard-00-01-hgi96.mongodb.net:27017,gettingstarted-shard-00-02-hgi96.mongodb.net:27017/chelpa?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';
        // // console.log(process.env);
        console.log(process.env);
        // var url = 'mongodb://127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;
        // if OPENSHIFT env variables are present, use the available connection info:
        // if (process.env.OPENSHIFT_MONGODB_DB_URL) {
        //   url = process.env.OPENSHIFT_MONGODB_DB_URL +
        //     process.env.OPENSHIFT_APP_NAME;
        // }
        // if (process.env.MONGO_URI) {
        //   console.log("HII");
        //   urlOpenShift = process.env.MONGO_URI +
        //     process.env.APP_NAME;
        // }
        var connect = function () {
            mongoose.connect(MONGO_URI);
        };
        connect();
        var db = mongoose.connection;
        db.on('error', function (error) {
            console.log("Error loading the db - " + error);
        });
        db.on('disconnected', connect);
        // mongoose.connect(MONGO_URI, (err) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log('Connected to MongoDB');
        //   }
        // });
        // express middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        // cors
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    // application routes
    Server.prototype.routes = function () {
        var router = express.Router();
        // this.app.use(validateFirebaseIdToken);
        this.app.get('/', function (req, res) {
            res.send("HEloo World");
        });
        this.app.get('/pagecount', function (req, res) {
            res.send("HEccccd");
        });
        // this.app.use('/api/v1/options', OptionsController);
        // this.app.use('/api/v1/events', EventController);
        this.app.use('/api/v1/trips', TripController_1.default);
        this.app.use('/api/v1/users', UserController_1.default);
        this.app.use('/api/v1/chats', ConversationController_1.default);
    };
    return Server;
}());
// export test
exports.default = new Server().app;
//# sourceMappingURL=server.js.map