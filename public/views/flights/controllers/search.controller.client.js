(function () {
    angular
        .module("FlightSearchApp")
        .controller("SearchController", SearchController);
    
    function SearchController($location, FlightService) {
        var vm = this;

        vm.searchFlight = searchFlight;

        function searchFlight(journey) {
            console.log(journey.departDate.toISOString().substring(0, 10));
            var searchUrl = "/flight/search/SRC/"+journey.source+"/DEST/"+journey.destination
                +"/DEPART/"+journey.departDate.toISOString().substring(0, 10)
                +"/RETURN/"+journey.returnDate.toISOString().substring(0, 10)
                +"/ADULTS/"+journey.noOfAdults+"/CHILD/"+
                journey.noOfChildren+"/CLASS/"+journey.selectedClass;
            $location.url(searchUrl);
        }
    }
})();