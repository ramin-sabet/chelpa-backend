"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var multer = require("multer");
var UserController = /** @class */ (function () {
    function UserController() {
        this.router = express_1.Router();
        this.routes();
    }
    UserController.prototype.create = function (req, res) {
        var upload = multer().single('image');
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading 
                return;
            }
            var userId = req.body.userId;
            var userName = req.body.userName;
            var phoneNumber = req.body.phoneNumber;
            // const image = {
            //     filename: req.file.filename,
            //     originalName: req.file.originalname,
            //     desc: req.body.desc
            // };
            var user = new User_1.default({
                userId: userId,
                userName: userName,
                phoneNumber: phoneNumber,
            });
            user.save()
                .then(function (data) {
                res.status(201).json({ data: data });
            })
                .catch(function (error) {
                res.status(500).json({ error: error });
            });
        });
    };
    UserController.prototype.getUser = function (req, res) {
        var userId = req.params._id;
        User_1.default.findOne({ userId: userId })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = req.params._id;
        User_1.default.findOneAndUpdate({ userId: userId }, {
            $set: {
                maleFemale: req.body.maleFemale,
                studyWork: req.body.studyWork,
                study: req.body.study,
                studyField: req.body.studyField,
                work: req.body.work,
                workField: req.body.workField,
                interests: req.body.interests,
            }
        })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // set up our routes
    UserController.prototype.routes = function () {
        this.router.post('/', this.create);
        this.router.get('/:_id', this.getUser);
        this.router.put('/:_id', this.updateUser);
    };
    return UserController;
}());
var userController = new UserController();
userController.routes();
exports.default = userController.router;
//# sourceMappingURL=UserController.js.map