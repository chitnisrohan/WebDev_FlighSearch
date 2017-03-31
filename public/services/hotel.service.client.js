(function () {
    angular
        .module("FlightSearchApp")
        .factory('HotelService', HotelService);

    function HotelService($http) {

        var ss_API_KEY = "5NPbEYxDOHBtMEMVCrAYRZuqqOVygdgv";
        var hotel_urlbase = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=" + ss_API_KEY +
            "&location=LOCATION_REQ&check_in=CHECKIN_REQ&check_out=CHECKOUT_REQ"

        var api = {
            "getHotels": getHotels
            // "getHotelSearchUrl": getHotelSearchUrl
        };
        return api;


        function getHotels (hotelBookingReq) {
            var hotelSearchUrl = hotel_urlbase.replace("LOCATION_REQ", hotelBookingReq.location)
                .replace("CHECKIN_REQ", hotelBookingReq.checkinDate)
                .replace("CHECKOUT_REQ",hotelBookingReq.checkoutDate);

            return $http.get(hotelSearchUrl);

        }

    }
})();