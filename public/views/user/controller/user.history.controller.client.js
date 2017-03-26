(function () {
    angular
        .module("FlightSearchApp")
        .controller("UserHistoryController", UserHistoryController);

    function UserHistoryController($location, $routeParams, MessageService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.deleteAlert = deleteAlert;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToProfile = goToProfile;

        function init() {
            MessageService
                .findAlertsForUser(userId)
                .then(
                    function (alerts) {
                        vm.alerts = alerts;
                    },
                    function (err) {
                        vm.error = "Error loading alerts";
                    }
                )
        }
        init();

        function goToFlightSearch() {
            $location.url("/user/" + userId + "/flightSearch");
        }

        function goToProfile() {
            $location.url("/user/" + userId);
        }

        function deleteAlert(alert) {
            MessageService
                .deleteAlert(alert._id)
                .then(
                    function (alerts) {
                        init();
                    },
                    function (err) {
                        vm.error = "Could not delete alert";
                    }
                )
        }
    }
})();