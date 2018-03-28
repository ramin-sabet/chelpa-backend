"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var UserController = /** @class */ (function () {
    function UserController() {
        this.router = express_1.Router();
        this.routes();
    }
    UserController.prototype.create = function (req, res) {
        var userId = req.body.userId;
        var username = req.body.username;
        var user = new User_1.default({
            userId: userId,
            username: username
        });
        user.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    // set up our routes
    UserController.prototype.routes = function () {
        this.router.post('/', this.create);
    };
    return UserController;
}());
var userController = new UserController();
userController.routes();
exports.default = userController.router;
//# sourceMappingURL=UserController.js.map