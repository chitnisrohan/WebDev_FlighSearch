(function () {
    angular
        .module("FlightSearchApp")
        .controller("UserNotificationController", UserNotificationController);

    function UserNotificationController($location, $routeParams, MessageService) {
        var vm = this;
        var userId = $routeParams['uid'];

        function init() {
            MessageService
                .getAllNotification(userId)
                .then(
                    function (notifications) {
                        vm.notifications = notifications.data;
                        vm.noNitifications = vm.notifications.length === 0;
                    },
                    function (err) {
                        vm.error = "Could not load notifications. Please try again";
                    }
                );
        }
        init();
    }
})();