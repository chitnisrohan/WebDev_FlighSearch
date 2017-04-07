module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        passwordRecoveryQuestion: String,
        passwordRecoveryAnswer: String,
        userType: {
            type: String,
            enum: ['USER', 'AGENT', 'ADMIN', 'HOTELOWNER'],
            default: 'USER'
        },
        organization : String,
        hotels: [{type: mongoose.Schema.Types.ObjectId, ref:'HotelModel'}],
        messages: [{type: mongoose.Schema.Types.ObjectId, ref:'MessageModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "userDatabase"});

    return UserSchema;

};