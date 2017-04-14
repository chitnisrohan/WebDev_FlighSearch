(function () {
    angular
        .module("FlightSearchApp")
        .controller("UserHistoryController", UserHistoryController);

    function UserHistoryController($location, $routeParams, MessageService, UserService) {
        var vm = this;
        var userId; //= $routeParams['uid'];

        vm.deleteAlert = deleteAlert;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToProfile = goToProfile;
        vm.goToUserNotification = goToUserNotification;
        vm.logout = logout;
        vm.goToHotelSearch = goToHotelSearch;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    MessageService
                        .findAlertsForUser(userId)
                        .then(
                            function (alerts) {
                                vm.alerts = alerts;
                                vm.isAlerts = vm.alerts.data.length === 0;
                            },
                            function (err) {
                                vm.error = "Error loading alerts";
                            }
                        );
                });
        }
        init();

        function goToUserNotification() {
            $location.url("/user/userNotification");
        }

        function goToFlightSearch() {
            $location.url("/user/flightSearch");
        }

        function goToProfile() {
            $location.url("/user/profile");
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

        function goToHotelSearch() {
            $location.url("/user/hotelSearch");
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $location.url("/");
                    }
                );
        }
    }
})();