"use strict";
exports.__esModule = true;
exports.indexrouter = void 0;
var express_1 = require("express");
var indexrouter = express_1["default"].Router();
exports.indexrouter = indexrouter;
indexrouter
    .route("/")
    .get(function (req, res) {
    res.send("/inventory for INVENTORY" + '\n' + "/accounts for EXPENSES");
});
