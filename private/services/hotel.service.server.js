module.exports = function (app, model) {

    var hotelId = {};
    var ss_API_KEY = process.env.HOTEL_KEY;
    var hotel_urlbase = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=" + ss_API_KEY +
        "&location=LOCATION_REQ&check_in=CHECKIN_REQ&check_out=CHECKOUT_REQ"


    app.get('/api/hotelsFromAPI',getHotels);
    app.get('/api/hotel/getid', getHotelId);
    app.post('/api/user-hotelowner/:userId/hotel', addHotel);
    app.get('/api/user-hotelowner/:userId/hotel', findHotelByOwner);
    app.put('/api/hotel/:hotelId/updateAvailability', updateHotelAvailability);
    app.delete('/api/hotel/:hotelId', deleteHotel);
    app.post('/api/searchHotel/', findHotels);
    app.get('/api/allHotels', findAllHotels);
    app.get('/api/hotel/:hotelId', findHotelById);
    app.put('/api/hotel/:hotelId', updateHotel);
    app.post('/api/hotel/saveId',saveHotelIdOnServer);

    function getHotels (req, res) {
        var hotelBookingReq = req.body;
        var hotelSearchUrl = hotel_urlbase.replace("LOCATION_REQ", hotelBookingReq.location)
            .replace("CHECKIN_REQ", hotelBookingReq.checkinDate)
            .replace("CHECKOUT_REQ",hotelBookingReq.checkoutDate);

        return $http.get(hotelSearchUrl);

    }


    function saveHotelIdOnServer (req, res) {
        var hotelIdObject = req.body;
        hotelId._id = hotelIdObject._id;
        res.json(true);
    }

    function getHotelId (req, res) {
        res.json(hotelId);
    }


    function findHotelById (req, res) {
        var hotelId = req.params['hotelId'];
        model
            .hotelModel
            .findHotelById(hotelId)
            .then(function (hotel) {
                    res.json(hotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function updateHotel (req, res) {
        var hotelId = req.params['hotelId'];
        var hotel = req.body;
        model
            .hotelModel
            .updateHotel(hotelId, hotel)
            .then(function (hotel) {
                    res.json(hotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
    
    function findAllHotels(req, res) {
        model
            .hotelModel
            .findAllHotels()
            .then(function (hotels) {
                    res.json(hotels);
                },
                function (err) {
                    res.sendStatus(400);
                });
    }

    function findHotels (req, res) {
        var query = req.body;
        model
            .hotelModel
            .findHotels(query)
            .then(function (hotels) {
                    res.json(hotels);
                },
                function (err) {
                    res.sendStatus(400);
                });
    }

    function addHotel (req, res) {
        var userId = req.params['userId'];
        var newhotel = req.body;

        model
            .hotelModel
            .addHotel(userId, newhotel)
            .then(
                function (newhotel) {
                    res.json(newhotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function findHotelByOwner (req, res) {
        var userId = req.params['userId'];
        model
            .hotelModel
            .findHotelByUser(userId)
            .then(
                function (hotels) {
                    res.json(hotels);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function updateHotelAvailability (req, res) {
        var hotelId = req.params['hotelId'];
        var bookingDates = req.body;
        model
            .hotelModel
            .updateHotelAvailability(hotelId, bookingDates)
            .then(
                function (hotel) {
                    res.json(hotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteHotel (req, res) {
        var hotelId = req.params['hotelId'];
        model
            .hotelModel
            .deleteHotel(hotelId)
            .then(
                function (hotel) {
                    res.json(hotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }


};