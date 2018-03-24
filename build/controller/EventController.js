"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Event_1 = require("../models/Event");
var EventController = /** @class */ (function () {
    function EventController() {
        this.router = express_1.Router();
        this.routes();
    }
    EventController.prototype.all = function (req, res) {
        Event_1.default.find({ "name": { "$regex": req.query.keyword, "$options": "i" } }, { name: 1 }).limit(parseInt(req.query.limit))
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    EventController.prototype.one = function (req, res) {
        var _id = req.params._id;
        Event_1.default.findOne({ _id: _id })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    EventController.prototype.create = function (req, res) {
        var name = req.body.name;
        var time = req.body.time;
        var price = req.body.price;
        var location = req.body.location;
        var capacity = req.body.capacity;
        var properties = req.body.properties;
        var event = new Event_1.default({
            name: name,
            time: time,
            price: price,
            location: location,
            capacity: capacity,
            properties: properties
        });
        event.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    EventController.prototype.update = function (req, res) {
        var _id = req.params._id;
        Event_1.default.findOneAndUpdate({ _id: _id }, {
            $push: {
                rides: {
                    from: req.body.From,
                    to: req.body.To,
                    time: req.body.time,
                    guestNumbers: req.body.guestNumbers,
                    costs: req.body.costs,
                    items: req.body.items,
                }
            }
        })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
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
    EventController.prototype.routes = function () {
        this.router.get('/', this.all);
        this.router.get('/:_id', this.one);
        this.router.post('/', this.create);
        this.router.put('/:_id', this.update);
        // this.router.delete('/:username', this.delete);
    };
    return EventController;
}());
var eventController = new EventController();
eventController.routes();
exports.default = eventController.router;
//# sourceMappingURL=EventController.js.map