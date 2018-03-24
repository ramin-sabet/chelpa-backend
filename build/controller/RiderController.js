"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Ride_1 = require("../models/Ride");
var RideController = /** @class */ (function () {
    function RideController() {
        this.router = express_1.Router();
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
    RideController.prototype.create = function (req, res) {
        var from = req.body.From;
        var to = req.body.To;
        var time = req.body.time;
        var guestNumbers = req.body.guestNumbers;
        var costs = req.body.costs;
        var items = req.body.items;
        var ride = new Ride_1.default({
            from: from,
            to: to,
            time: time,
            guestNumbers: guestNumbers,
            costs: costs,
            items: items
        });
        ride.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    //   public update(req: Request, res: Response): void {
    //     const username: string = req.params.usernRide
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
    RideController.prototype.routes = function () {
        // this.router.get('/', this.all);
        // this.router.get('/:_id', this.one);
        this.router.post('/', this.create);
        // this.router.put('/:username', this.update);
        // this.router.delete('/:username', this.delete);
    };
    return RideController;
}());
var rideController = new RideController();
rideController.routes();
exports.default = rideController.router;
//# sourceMappingURL=RiderController.js.map