"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Trip_1 = require("../models/Trip");
var TripController = /** @class */ (function () {
    function TripController() {
        this.router = express_1.Router();
        this.routes();
    }
    TripController.prototype.createTrip = function (req, res) {
        var creatorId = req.body.creatorId;
        var from = req.body.from;
        var to = req.body.to;
        var time = req.body.time;
        var transportationOption = req.body.transportationOption;
        var price = req.body.price;
        var guestNumbers = req.body.guestNumbers;
        var trip = new Trip_1.default({
            creatorId: creatorId,
            from: from,
            to: to,
            time: time,
            transportationOption: transportationOption,
            price: price,
            guestNumbers: guestNumbers,
        });
        trip.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // set up our routes
    TripController.prototype.routes = function () {
        this.router.post('/', this.createTrip);
    };
    return TripController;
}());
var tripController = new TripController();
tripController.routes();
exports.default = tripController.router;
//# sourceMappingURL=TripController.js.map