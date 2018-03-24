import { Request, Response, Router } from 'express';
import Rider from '../models/Rider';

class RiderController {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

//   public all(req: Request, res: Response): void {

//     Event.find({ "name": { "$regex": req.query.keyword, "$options": "i" } }, { name: 1 }).limit(parseInt(req.query.limit))
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });

//   }

//   public one(req: Request, res: Response): void {
//     const _id: string = req.params._id;

//     Event.findOne({ _id })
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
//   }

  public create(req: Request, res: Response): void {
    const from: string = req.body.From;
    const to: string = req.body.To;
    const time: string = req.body.time;
    const guestNumbers: Number = req.body.guestNumbers;
    const costs: Number = req.body.costs;
    const items: string = req.body.items;

    const rider = new Rider({
      from,
      to,
      time,
      guestNumbers,
      costs,
      items
    });

    rider.save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });

  }

  //   public update(req: Request, res: Response): void {
  //     const username: string = req.params.usernrider
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
    // this.router.get('/', this.all);
    // this.router.get('/:_id', this.one);
    this.router.post('/', this.create);
    // this.router.put('/:username', this.update);
    // this.router.delete('/:username', this.delete);
  }

}

const riderController = new RiderController();
riderController.routes();

export default riderController.router;