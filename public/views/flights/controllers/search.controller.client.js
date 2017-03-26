(function () {
    angular
        .module("FlightSearchApp")
        .controller("SearchController", SearchController);
    
    function SearchController($routeParams, $location, FlightService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.searchFlight = searchFlight;
        vm.setUpAlert = setUpAlert;
        vm.goToUserHistory = goToUserHistory;

        function init() {
            if (userId) {
                vm.isLoggedIn = true;
            } else {
                vm.isLoggedIn = false;
            }
        }
        init();

        function goToUserHistory() {
            $location.url("/user/" + userId + "/userHistory");
        }

        function setUpAlert(journey) {
            if (journey.source && journey.destination && journey.departDate) {
                FlightService
                    .setUpAlert(journey, userId)
                    .then(
                        function (alert) {
                            vm.message = "Alert has been setup for your journey";
                        },
                        function (err) {
                            vm.error = "Could not setup alert for this journey. Please try again";
                        }
                    );
            } else {
                vm.error = "Please fill in data for creating alert";
            }
        }

        function searchFlight(journey) {
            var searchUrl;
            if (typeof journey.returnDate != "undefined") {
                searchUrl = "/flight/search/SRC/"+journey.source+"/DEST/"+journey.destination
                    +"/DEPART/"+journey.departDate.toISOString().substring(0, 10)
                    +"/RETURN/"+journey.returnDate.toISOString().substring(0, 10)
                    +"/ADULTS/"+journey.noOfAdults+"/CHILD/"+
                    journey.noOfChildren+"/CLASS/"+journey.selectedClass;
            } else {
                searchUrl = "/flight/search/SRC/"+journey.source+"/DEST/"+journey.destination
                    +"/DEPART/"+journey.departDate.toISOString().substring(0, 10)
                    +"/RETURN/"+0
                    +"/ADULTS/"+journey.noOfAdults+"/CHILD/"+
                    journey.noOfChildren+"/CLASS/"+journey.selectedClass;
            }
            $location.url(searchUrl);
        }
    }
})();