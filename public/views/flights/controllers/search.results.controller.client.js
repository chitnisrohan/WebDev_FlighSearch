(function () {
    angular
        .module("FlightSearchApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($location, FlightService, $routeParams) {
        //flight/search/SRC/:src/DEST/:dest/DEPART/:dept/RETURN/:ret/ADULTS/:adults/CHILD/:child/CLASS/:class
        var vm = this;
        var source = $routeParams['src'];
        var destination = $routeParams['dest'];
        var departDate = $routeParams['dept'];
        var returnDate = $routeParams['ret'];
        var noOfAdults = $routeParams['adults'];
        var noOfChildren = $routeParams['child'];
        var cabinClass = $routeParams['class'];

        function init() {
            var journey = {source: source, destination : destination
                , noOfAdults : noOfAdults, noOfChildren : noOfChildren,
                departDate : departDate, returnDate : returnDate
                , cabinClass : cabinClass};
            // FlightService
            //     .getFlights(journey)
            //     .success(function (flights) {
            //         vm.flightSearchResults = flights;
            //         console.log(vm.flightSearchResults);
            //     })
            //     .error(function (err) {
            //         vm.err = err;
            //     });
        }
        init();

    }
})();