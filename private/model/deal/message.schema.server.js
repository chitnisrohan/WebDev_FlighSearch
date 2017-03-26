module.exports = function() {
    var mongoose = require("mongoose");
    //var WebsiteSchema = require("../website/website.schema.server")();

    var MessageSchema = mongoose.Schema({
        userid : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        agentid : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        message : String,
        source : String,
        destination : String,
        departDate : String,
        returnDate : String,
        response: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "messageDatabase"});

    return MessageSchema;

};