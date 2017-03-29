module.exports = function() {
    var mongoose = require("mongoose");

    var MessageSchema = mongoose.Schema({
        userid : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        NotVisibleForAgents : [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        AgentsResponded : [
            {agentId : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}, message : String}],
        //message : String,
        source : String,
        destination : String,
        departDate : String,
        returnDate : String,
        response: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "messageDatabase"});

    return MessageSchema;

};