(function () {
    angular
        .module("FlightSearchApp")
        .factory("FlightService", FlightService);

    function FlightService($http) {

        var API_KEY = "BT0qwyGROrYNqrWOeMLruNXF2tT27kMr";
        var urlBase = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=" + API_KEY + "&origin=SOURCE&destination=DESTINATION&departure_date=DEPARTDATE&return_date=RETURNDATE&adults=NOOFADULTS&children=NOOFCHILDREN&travel_class=CABINCLASS&number_of_results=20";
                     //https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=BT0qwyGROrYNqrWOorigin=BOS&destination=LON&departure_date=2017-08-25&return_date=2017-08-29           &adults=2&children=2&travel_class=FIRST&number_of_results=15
        var api = {
            "getFlights": getFlights,
            "setUpAlert" : setUpAlert
        };
        return api;

        function setUpAlert(journey, userId) {
            return $http.post("/api/" + userId + "/setupAlert",journey);
        }

        function getFlights(journey) {
            //GET "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=BT0qwyGROrYNqrWOeMLruNXF2tT27kMr&origin=BOS&destination=BOM&departure_date=2017-04-04&return_date=2017-04-10&adults=2&children=0"
            var url;
            if (journey.returnDate === "0") {
                url = urlBase.replace("DESTINATION", journey.destination)
                    .replace("SOURCE", journey.source)
                    .replace("NOOFADULTS",journey.noOfAdults)
                    .replace("NOOFCHILDREN",journey.noOfChildren)
                    .replace("DEPARTDATE",journey.departDate)
                    .replace("&return_date=RETURNDATE","")
                    .replace("CABINCLASS", journey.cabinClass);
            } else {
                url = urlBase.replace("DESTINATION", journey.destination)
                    .replace("SOURCE", journey.source)
                    .replace("NOOFADULTS",journey.noOfAdults)
                    .replace("NOOFCHILDREN",journey.noOfChildren)
                    .replace("DEPARTDATE",journey.departDate)
                    .replace("RETURNDATE",journey.returnDate)
                    .replace("CABINCLASS", journey.cabinClass);
            }
            var result = $http.get(url);
            return result;
        }
    }
})();