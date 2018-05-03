// import { Request, Response, Router } from 'express';
// import Event from '../models/Event';
// class EventController {
//   public router: Router;
//   constructor() {
//     this.router = Router();
//     this.routes();
//   }
//   public allEvents(req: Request, res: Response): void {
//     Event.find({ "name": { "$regex": req.query.keyword, "$options": "i" } }, { name: 1 }).limit(parseInt(req.query.limit))
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
//   }
//   public oneEvent(req: Request, res: Response): void {
//     const _id: string = req.params._id;
//     Event.findOne({ _id })
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
//   }
//   public allRides(req: Request, res: Response): void {
//     const _id: string = req.params._id;
//     Event.findOne({ _id }, { rides: 1, _id: 0 })
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
//   }
//   public createEvent(req: Request, res: Response): void {
//     const creatorId: string = req.body.creatorId;
//     const name: string = req.body.name;
//     const time: string = req.body.time;
//     const price: string = req.body.price;
//     const location: string = req.body.location;
//     const capacity: string = req.body.capacity;
//     const properties: string = req.body.properties;
//     const event = new Event({
//       creatorId,
//       name,
//       time,
//       price,
//       location,
//       capacity,
//       properties
//     });
//     event.save()
//       .then((data) => {
//         res.status(201).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
//   }
//   public updateRides(req: Request, res: Response): void {
//     const _id: string = req.params._id;
//     Event.findOneAndUpdate({ _id }, {
//       $push: {
//         rides: {
//           creatorId: req.body.creatorId,
//           from: req.body.From,
//           to: req.body.To,
//           time: req.body.time,
//           guestNumbers: req.body.guestNumbers,
//           costs: req.body.costs,
//           items: req.body.items,
//         }
//       }
//     })
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
//   }
//   public joinRides(req: Request, res: Response): void {
//     const _id: string = req.params._id;
//     const rideId: string = req.body.rideId;
//     Event.findOneAndUpdate({ "_id": _id, "rides._id": rideId }, {
//       "$push": {
//         "rides.$.peopleJoined": {
//           "userId": req.body.userId,
//           "rideId": req.body.rideId
//         }
//       }
//     })
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
//   }
//   //   public delete(req: Request, res: Response): void {
//   //     const username: string = req.params.username;
//   //     User.findOneAndRemove({ username })
//   //     .then(() => {
//   //       res.status(204).end();
//   //     })
//   //     .catch((error) => {
//   //       res.status(500).json({ error });
//   //     });
//   //   }
//   // set up our routes
//   public routes() {
//     this.router.get('/', this.allEvents);
//     this.router.get('/:_id', this.oneEvent);
//     this.router.get('/rides/:_id', this.allRides)
//     this.router.post('/', this.createEvent);
//     this.router.put('/:_id', this.updateRides);
//     this.router.put('/rides/:_id', this.joinRides);
//     // this.router.delete('/:username', this.delete);
//   }
// }
// const eventController = new EventController();
// eventController.routes();
// export default eventController.router;
//# sourceMappingURL=EventController.js.map