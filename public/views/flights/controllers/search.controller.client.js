(function () {
    angular
        .module("FlightSearchApp")
        .controller("SearchController", SearchController);
    
    function SearchController($location, FlightService) {
        var vm = this;

        vm.searchFlight = searchFlight;

        function searchFlight(journey) {
            FlightService
                .getFlights(journey)
                .success(function (flights) {
                    vm.flightData = flights;
                    //console.log(flights.results[0].itineraries[0].outbound.flights[0].arrives_at);
                })
                .error(function (err) {
                    vm.err = err;
                });
        }
    }
})();