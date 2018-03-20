import { Request, Response, Router } from 'express';
import Event from '../models/Event';

class EventController {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    
    Event.find({ "name": { "$regex": req.query.keyword, "$options": "i" } },{name :1 ,_id:0}).limit(parseInt(req.query.limit))
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  
  }

//   public one(req: Request, res: Response): void {
//     const username: string = req.params.username;

//     Event.findOne({ username })
//     .then((data) => {
//       res.status(200).json({ data });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
//   }

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const time: string = req.body.time;
    const price: string = req.body.price;
    const location: string = req.body.location;
    const capacity: string = req.body.capacity;
    const properties : string = req.body.properties;

    const event = new Event({
      name,
      time,
      price,
      location,
      capacity,
      properties
    });

    event.save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  }

//   public update(req: Request, res: Response): void {
//     const username: string = req.params.username;

//     User.findOneAndUpdate({ username }, req.body)
//     .then((data) => {
//       res.status(200).json({ data });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });

//   }

//   public delete(req: Request, res: Response): void {
//     const username: string = req.params.username;

//     User.findOneAndRemove({ username })
//     .then(() => {
//       res.status(204).end();
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });

//   }

  // set up our routes
  public routes() {
    this.router.get('/', this.all);
    // this.router.get('/:username', this.one);
    this.router.post('/', this.create);
    // this.router.put('/:username', this.update);
    // this.router.delete('/:username', this.delete);
  }

}

const eventController = new EventController();
eventController.routes();

export default eventController.router;