module.exports = function() {
    var mongoose = require("mongoose");

    var MessageSchema = mongoose.Schema({
        userid : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        username: String,
        // if agent deleted message from notification OR history, Add it to NotVisibleForAgents
        NotVisibleForAgents : [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        //doNotNotifyUser : [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        AgentsResponded : [
            {agentId : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
                message : String,
                visible : Boolean,
                agentName : String}],
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