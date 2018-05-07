"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    TripController.prototype.getTrips = function (req, res) {
        var _this = this;
        var _id = req.params._id;
        var timeLimit = req.params.time;
        var fromLimit = req.params.from;
        var toLimit = req.params.to;
        Trip_1.default.find()
            .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var request, modifiedTimes, modifiedFrom, timeFirst, origins, returnedDistances, modifiedData, x, a, x, x;
            return __generator(this, function (_a) {
                request = require('request');
                modifiedTimes = [];
                modifiedFrom = '';
                origins = '';
                returnedDistances = [];
                modifiedData = [];
                for (x = 0; x < data.length; x++) {
                    if (data[x]['_id'] == _id) {
                        timeFirst = data[x]['time'].getTime();
                        origins = data[x]['from'] + '|' + data[x]['to'];
                    }
                }
                for (a = 0; a < data.length; a++) {
                    if (Math.abs(timeFirst - data[a]['time'].getTime()) <= (timeLimit * 60000)) {
                        modifiedTimes.push(data[a]);
                    }
                }
                for (x = 0; x < modifiedTimes.length; x++) {
                    modifiedFrom += modifiedTimes[x]['from'].toString();
                    modifiedFrom += '|';
                }
                for (x = 0; x < modifiedTimes.length; x++) {
                    modifiedFrom += modifiedTimes[x]['to'].toString();
                    modifiedFrom += '|';
                }
                if (modifiedTimes.length > 0) {
                    request("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + origins + "&destinations=" + modifiedFrom + "&key=AIzaSyCbshc9GyX5Fp4QGQRm0G4qn4J8YzHLlqw", function (error, response, body) {
                        for (var x = 0; x < (JSON.parse(body).rows[0].elements.length / 2); x++) {
                            if ((parseInt(JSON.parse(body).rows[0].elements[x].distance.text)) <= fromLimit) {
                                if ((parseInt(JSON.parse(body).rows[1].elements[x + (JSON.parse(body).rows[0].elements.length / 2)].distance.text)) <= toLimit) {
                                    if (data[x]._id != _id) {
                                        modifiedData.push(data[x]);
                                        if (x == (JSON.parse(body).rows[0].elements.length / 2) - 1) {
                                            res.status(200).json({ modifiedData: modifiedData });
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
                else {
                    res.status(200).json("No Data exists");
                }
                return [2 /*return*/];
            });
        }); })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // set up our routes
    TripController.prototype.routes = function () {
        this.router.post('/', this.createTrip);
        this.router.get('/:_id/:time/:from/:to', this.getTrips);
    };
    return TripController;
}());
var tripController = new TripController();
tripController.routes();
exports.default = tripController.router;
//# sourceMappingURL=TripController.js.map