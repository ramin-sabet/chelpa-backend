import { Request, Response, Router } from 'express';
import Trip from '../models/Trip';

class TripController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }


    public createTrip(req: Request, res: Response): void {
        const creatorId: string = req.body.creatorId;
        const from: string = req.body.from;
        const to: string = req.body.to;
        const time: string = req.body.time;
        const transportationOption: string = req.body.transportationOption;
        const price: string = req.body.price;
        const guestNumbers: string = req.body.guestNumbers;

        const trip = new Trip({
            creatorId,
            from,
            to,
            time,
            transportationOption,
            price,
            guestNumbers,
        });

        trip.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }
    public getTrips(req: Request, res: Response): void {

        Trip.find({},{lean:true})
            .then((data) => {
                console.log(data);
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });

    }

    // set up our routes
    public routes() {
        this.router.post('/', this.createTrip);
        this.router.get('/', this.getTrips);
    }

}

const tripController = new TripController();
tripController.routes();

export default tripController.router;