module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var HotelSchema = require("./hotel.schema.server.js")();
    var HotelModel = mongoose.model("HotelModel", HotelSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        addHotel: addHotel,
        findHotelByUser: findHotelByUser,
        updateHotelAvailability: updateHotelAvailability,
        deleteHotel: deleteHotel,
        findHotels: findHotels,
        findHotelById: findHotelById,
        updateHotel: updateHotel

    };
    return api;


    function setModel(_model) {
        model = _model;
    }

    function updateHotel (hotelId, hotel) {
        var deferred = Q.defer();
        console.log(hotelId);
        console.log(hotel);

        HotelModel
            .update({"_id":hotelId}, {property_name: hotel.property_name,
                addressline1: hotel.addressline1,
                city: hotel.city,
                region: hotel.region,
                postal_code: hotel.postal_code,
                phone: hotel.phone,
                fax : hotel.fax,
                amenities: hotel.amenities,
                total_price: hotel.total_price}, function (err, hotel) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(hotel);
                }
            });
        return deferred.promise;
    }

    function findHotelById (hotelId) {
        var deferred = Q.defer();
        // console.log(hotelId);
        HotelModel
            .findOne({"_id": hotelId}, function (err, hotel) {
                if(err){
                    deferred.abort();
                }
                else{
                    deferred.resolve(hotel);
                    // console.log(hotel);
                }
            });
        return deferred.promise;
    }

    function findHotels (query) {
        var deferred = Q.defer();
        // console.log(query);

        HotelModel
            .find({},function (err, hotels) {
                if(err){
                    deferred.abort(err);
                }else{
                    var availableHotels = [];
                    for(var i=0; i<hotels.length; i++){
                        if(hotels[i].city != query.location)
                            continue;
                        var available = true;
                        for(var j=0; j<hotels[i].BookedDates.length; j++){
                            var date = hotels[i].BookedDates[j];
                            var a = query.checkinDate.split("-");
                            var b = query.checkoutDate.split("-");
                            var a2 = new Date(a[0], a[1] - 1, a[2]);
                            var b2 = new Date(b[0], b[1] - 1, b[2]);
                            var c = date.checkIn.split("-");
                            var c2 = new Date(c[0], c[1] - 1, c[2]);
                            var d = date.checkOut.split("-");
                            var d2 = new Date(d[0], d[1] - 1, d[2]);
                            if (b < c || a > d) {
                                continue;
                            } else {
                                available = false;
                                break;
                            }
                        }
                        if (available) {
                            availableHotels.push(hotels[i]);
                        }
                    }
                    deferred.resolve(availableHotels);
                }
            });
        return deferred.promise;

    }

    function addHotel (userId, hotel) {
        var deferred = Q.defer();
        hotel._user = userId;
        HotelModel
            .create(hotel, function (err, hotel) {
                if(err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(hotel);
                }
            });
        return deferred.promise;
    }

    function findHotelByUser (userId) {
        var deferred = Q.defer();
        HotelModel
            .find({"_user": userId}, function (err, hotels) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(hotels);
                }
            });
        return deferred.promise;
    }

    function updateHotelAvailability (hotelId, bookingDates) {
        var deferred = Q.defer();
        HotelModel
            .update({"_id": hotelId}, {$push : {BookedDates : bookingDates}}, function (err, hotel) {
                if(err){
                    deferred.abort(err);
                } else {
                    deferred.resolve(hotel);
                }
            });
        return deferred.promise;
    }

    function deleteHotel (hotelId) {
        var deferred = Q.defer();
        HotelModel
            .remove({_id: hotelId}, function (err, hotel) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(hotel);
                }
            });
        return deferred.promise;
    }

};