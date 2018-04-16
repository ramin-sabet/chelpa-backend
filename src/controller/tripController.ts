import { Request, Response, Router } from 'express';
import Trip from '../models/Trip';
import { text } from 'body-parser';


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

        const _id: string = req.params._id;
        const timeLimit: number = req.params.time;
        const fromLimit: number = req.params.from;
        const toLimit: number = req.params.to;

        Trip.find()
            .then(async (data) => {
                var request = require('request');
                let modifiedTimes = [];
                let modifiedFrom = '';
                let timeFirst: any;
                let origins = '';
                let returnedDistances = [];
                let modifiedData = [];

                for (let x = 0; x < data.length; x++) {
                    if (data[x]['_id'] == _id) {
                        timeFirst = data[x]['time'].getTime();
                        origins = data[x]['from'] + '|' + data[x]['to'];
                    }
                }

                for (let a = 0; a < data.length; a++) {

                    if (Math.abs(timeFirst - data[a]['time'].getTime()) <= (timeLimit * 3600000)) {
                        modifiedTimes.push(data[a]);
                    }
                }

                for (let x = 0; x < modifiedTimes.length; x++) {
                    modifiedFrom += modifiedTimes[x]['from'].toString();
                    modifiedFrom += '|';
                }

                for (let x = 0; x < modifiedTimes.length; x++) {
                    modifiedFrom += modifiedTimes[x]['to'].toString();
                    modifiedFrom += '|';
                }

                if (modifiedTimes.length > 0) {
                    request(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${modifiedFrom}&key=AIzaSyCbshc9GyX5Fp4QGQRm0G4qn4J8YzHLlqw`, function (error, response, body) {
                        for (let x = 0; x < (JSON.parse(body).rows[0].elements.length / 2); x++) {
                            if ((parseInt(JSON.parse(body).rows[0].elements[x].distance.text)) <= fromLimit) {
                                if ((parseInt(JSON.parse(body).rows[1].elements[x + (JSON.parse(body).rows[0].elements.length / 2)].distance.text)) <= toLimit) {
                                    if (data[x]._id != _id) {
                                        modifiedData.push(data[x]);
                                        if (x == (JSON.parse(body).rows[0].elements.length / 2) - 1) {
                                            res.status(200).json({ modifiedData });
                                        }
                                    }
                                }
                            }
                        }
                    })
                } else {
                    res.status(200).json("No Data exists");
                }
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // set up our routes
    public routes() {
        this.router.post('/', this.createTrip);
        this.router.get('/:_id/:time/:from/:to', this.getTrips);
    }

}

const tripController = new TripController();
tripController.routes();

export default tripController.router;
