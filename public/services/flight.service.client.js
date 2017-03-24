(function () {
    angular
        .module("FlightSearchApp")
        .factory("FlightService", FlightService);

    function FlightService($http) {

        var API_KEY = "BT0qwyGROrYNqrWOeMLruNXF2tT27kMr";
        var urlBase = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=" + API_KEY + "&origin=SOURCE&destination=DESTINATION&departure_date=2017-04-04&return_date=2017-04-10&adults=NOOFADULTS&children=NOOFCHILDREN";

        var api = {
            "getFlights": getFlights
        };
        return api;

        function getFlights(journey) {
            //GET "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=BT0qwyGROrYNqrWOeMLruNXF2tT27kMr&origin=BOS&destination=BOM&departure_date=2017-04-04&return_date=2017-04-10&adults=2&children=0"
            var url = urlBase.replace("DESTINATION", journey.destination)
                .replace("SOURCE", journey.source)
                .replace("NOOFADULTS",journey.noOfAdults)
                .replace("NOOFCHILDREN",journey.noOfChildren);
            var result = $http.get(url);
            return result;
        }

    }
})();