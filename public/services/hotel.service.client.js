(function () {
    angular
        .module("FlightSearchApp")
        .factory('HotelService', HotelService);

    function HotelService($http) {


        var api = {
            "findAllHotels" : findAllHotels,
            "getHotels": getHotels,
            "addHotel": addHotel,
            "findHotelsByOwner": findHotelsByOwner,
            "updateHotelAvailibility": updateHotelAvailibility,
            "deleteHotel": deleteHotel,
            "getRegisteredHotels" : getRegisteredHotels,
            "findHotelById": findHotelById,
            "updateHotel": updateHotel,
            "saveHotelIdOnServer": saveHotelIdOnServer,
            "getHotelId": getHotelId
        };
        return api;

        function saveHotelIdOnServer(hotelIdObject){
            return $http.post('/api/hotel/saveId', hotelIdObject);
        }

        function getHotelId () {
            return $http.get('/api/hotel/getid');
        }

        function findHotelById (hotelId) {
            return $http.get('/api/hotel/' + hotelId);
        }

        function findAllHotels() {
            return $http.get('/api/allHotels');
        }

        function getRegisteredHotels(hotelBookingReq) {
            return  $http.post('/api/searchHotel/', hotelBookingReq);
        }

        function updateHotel (hotelId, hotel) {
            return $http.put('/api/hotel/' + hotelId, hotel);
        }

        function getHotels (hotelBookingReq) {
            // var hotelSearchUrl = hotel_urlbase.replace("LOCATION_REQ", hotelBookingReq.location)
            //     .replace("CHECKIN_REQ", hotelBookingReq.checkinDate)
            //     .replace("CHECKOUT_REQ",hotelBookingReq.checkoutDate);
            //
            // return $http.get(hotelSearchUrl);
            return $http.get('/api/hotelsFromAPI', hotelBookingReq);

        }

        function addHotel(hotel, userId) {
            return $http.post('/api/user-hotelowner/' + userId + '/hotel', hotel);
        }

        function findHotelsByOwner (userId) {
            return $http.get("/api/user-hotelowner/" + userId + "/hotel");
        }

        function updateHotelAvailibility (bookingDates, hotelId) {
            return $http.put('/api/hotel/' + hotelId + '/updateAvailability', bookingDates);
        }

        function deleteHotel (hotelId) {
            return $http.delete('/api/hotel/' + hotelId);
        }

    }
})();