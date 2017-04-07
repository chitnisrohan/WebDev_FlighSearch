module.exports = function (app, model) {

    app.post('/api/user-hotelowner/:userId/hotel', addHotel);
    app.get('/api/user-hotelowner/:userId/hotel', findHotelByOwner);
    app.put('/api/hotel/:hotelId/updateAvailability', updateHotelAvailability);
    app.delete('/api/hotel/:hotelId', deleteHotel);
    app.post('/api/searchHotel/', findHotels);
    app.get('/api/allHotels', findAllHotels);
    app.get('/api/hotel/:hotelId', findHotelById);
    app.put('/api/hotel/:hotelId', updateHotel);


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
        console.log(hotelId);
        console.log(hotel);
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