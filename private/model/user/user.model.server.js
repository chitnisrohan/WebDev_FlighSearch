module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var Q = require("q");

    var api = {
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }


};