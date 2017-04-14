(function () {
    angular
        .module("FlightSearchApp")
        .factory("FlightService", FlightService);

    function FlightService($http) {

        var urlBase = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=API_KEY&origin=SOURCE&destination=DESTINATION&departure_date=DEPARTDATE&return_date=RETURNDATE&adults=NOOFADULTS&children=NOOFCHILDREN&travel_class=CABINCLASS&number_of_results=20";

        var api = {
            "getFlights": getFlights,
            "setUpAlert" : setUpAlert,
            "getAPIKEY" : getAPIKEY
        };
        return api;

        function setUpAlert(journey, userId) {
            return $http.post("/api/" + userId + "/setupAlert",journey);
        }

        function getAPIKEY() {
            return $http.get('/api/getAPIKey');
        }

        function getFlights(journey, API_KEY) {
            // getAPIKEY().success(function (API_KEY) {
                var url;
                API_KEY = API_KEY.replace('"','').replace('"','');
                if (journey.returnDate === "0") {
                    url = urlBase.replace("DESTINATION", journey.destination)
                        .replace("SOURCE", journey.source)
                        .replace("API_KEY", API_KEY)
                        .replace("NOOFADULTS",journey.noOfAdults)
                        .replace("NOOFCHILDREN",journey.noOfChildren)
                        .replace("DEPARTDATE",journey.departDate)
                        .replace("&return_date=RETURNDATE","")
                        .replace("CABINCLASS", journey.cabinClass);
                } else {
                    url = urlBase.replace("DESTINATION", journey.destination)
                        .replace("SOURCE", journey.source)
                        .replace("NOOFADULTS",journey.noOfAdults)
                        .replace("API_KEY", API_KEY)
                        .replace("NOOFCHILDREN",journey.noOfChildren)
                        .replace("DEPARTDATE",journey.departDate)
                        .replace("RETURNDATE",journey.returnDate)
                        .replace("CABINCLASS", journey.cabinClass);
                }
                return $http.get(url);
            // });

        }
    }
})();