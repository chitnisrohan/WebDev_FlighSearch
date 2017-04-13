module.exports = function() {
    var mongoose = require("mongoose");

    var HotelSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        username : String,
        property_name: String,
        addressline1: String,
        city: String,
        region: String,
        postal_code: String,
        phone: String,
        fax : String,
        amenities: String,
        BookedDates : [{ checkIn: String,
            checkOut: String}],
        total_price: String,
        dateCreated: {type: Date, default: Date.now}

    }, {collection: "hotelDatabase"});

    return HotelSchema;

};