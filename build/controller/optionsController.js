"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Option_1 = require("../models/Option");
var OptionController = /** @class */ (function () {
    function OptionController() {
        this.router = express_1.Router();
        this.routes();
    }
    OptionController.prototype.suggestedOptions = function (req, res) {
        Option_1.default.find({ "name": { "$regex": req.query.keyword, "$options": "i" } }, { name: 1, _id: 0 }).limit(parseInt(req.query.limit))
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    OptionController.prototype.create = function (req, res) {
        var name = req.body.name;
        var option = new Option_1.default({
            name: name
        });
        option.save()
            .then(function (data) {
            res.status(201).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    OptionController.prototype.routes = function () {
        this.router.get('/', this.suggestedOptions);
        // this.router.get('/:username', this.one);
        this.router.post('/', this.create);
        // this.router.put('/:username', this.update);
        // this.router.delete('/:username', this.delete);
    };
    return OptionController;
}());
var optionController = new OptionController();
optionController.routes();
exports.default = optionController.router;
//# sourceMappingURL=optionsController.js.map