import { Request, Response, Router } from 'express';
import Trip from '../models/Trip';
import { text } from 'body-parser';
import { ENETRESET } from 'constants';

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

        Trip.find({}, { from: 1, to: 1, time: 1, _id: 0 })
            .then(async (data) => {
                var request = require('request');
                let timeFirst = data[0]['time'].getTime();
                let fromFirst = data[0]['from'];
                let modifiedTimes = [];
                let modifiedFrom = [];
                let modifiedFrom2;
                for (let i = 1; i < data.length; i++) {
                    if (Math.abs(timeFirst - data[i]['time'].getTime()) <= 3600000) {
                        modifiedTimes.push(data[i]);
                    }
                }

                for (let i = 0; i < modifiedTimes.length; i++) {
                    // return new Promise(function (resolve, reject) {
                        request(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${fromFirst}&destinations=${modifiedTimes[i].from}&key=AIzaSyCbshc9GyX5Fp4QGQRm0G4qn4J8YzHLlqw`, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                if (parseInt(JSON.parse(body).rows[0].elements[0].distance.text) < 550) {
                                    modifiedFrom.push(modifiedTimes[i]);
                                    console.log(modifiedFrom);
                                    // return modifiedFrom;
                                }

                            }

                        })
                    // })

                }





                // modifiedFrom2 = getModifiedFrom().then(res => console.log(res))
                // console.log(modifiedFrom2);

                res.status(200).json({ modifiedFrom });
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