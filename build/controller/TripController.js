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
        Trip_1.default.find({}, { from: 1, to: 1, time: 1, _id: 0 })
            .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var request, timeFirst, fromFirst, modifiedTimes, modifiedFrom, modifiedFrom2, i, _loop_1, i;
            return __generator(this, function (_a) {
                request = require('request');
                timeFirst = data[0]['time'].getTime();
                fromFirst = data[0]['from'];
                modifiedTimes = [];
                modifiedFrom = [];
                for (i = 1; i < data.length; i++) {
                    if (Math.abs(timeFirst - data[i]['time'].getTime()) <= 3600000) {
                        modifiedTimes.push(data[i]);
                    }
                }
                _loop_1 = function (i) {
                    // return new Promise(function (resolve, reject) {
                    request("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + fromFirst + "&destinations=" + modifiedTimes[i].from + "&key=AIzaSyCbshc9GyX5Fp4QGQRm0G4qn4J8YzHLlqw", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            if (parseInt(JSON.parse(body).rows[0].elements[0].distance.text) < 550) {
                                modifiedFrom.push(modifiedTimes[i]);
                                console.log(modifiedFrom);
                                // return modifiedFrom;
                            }
                        }
                    });
                    // })
                };
                for (i = 0; i < modifiedTimes.length; i++) {
                    _loop_1(i);
                }
                // modifiedFrom2 = getModifiedFrom().then(res => console.log(res))
                // console.log(modifiedFrom2);
                res.status(200).json({ modifiedFrom: modifiedFrom });
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
        this.router.get('/', this.getTrips);
    };
    return TripController;
}());
var tripController = new TripController();
tripController.routes();
exports.default = tripController.router;
//# sourceMappingURL=TripController.js.map