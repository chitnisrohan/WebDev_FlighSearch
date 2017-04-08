(function () {
    angular
        .module("FlightSearchApp")
        .controller("UserNotificationController", UserNotificationController);

    function UserNotificationController($location, $routeParams, MessageService, UserService) {
        var vm = this;
        var userId; // = $routeParams['uid'];

        vm.deleteNotification = deleteNotification;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToProfile = goToProfile;
        vm.goToUserHistory = goToUserHistory;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    MessageService
                        .getAllNotification(userId)
                        .then(
                            function (notifications) {
                                var validNotifications = [];
                                for (var n in notifications.data) {
                                    var notification = notifications.data[n];
                                    var msgs = notification.AgentsResponded;
                                    if (msgs.length === 0) {
                                        continue;
                                    }
                                    var validMsgs = [];
                                    for (var i = 0; i < msgs.length ; i++) {
                                        var msg = msgs[i];
                                        if (msg.visible) {
                                            validMsgs.push(msg);
                                        }
                                    }
                                    if (validMsgs.length > 0) {
                                        notification.AgentsResponded = validMsgs;
                                        validNotifications.push(notification);
                                    }
                                }
                                vm.notifications = validNotifications;
                                vm.noNitifications = vm.notifications.length === 0;
                            },
                            function (err) {
                                vm.error = "Could not load notifications. Please try again";
                            }
                        );
            });
        }
        init();

        function goToFlightSearch() {
            $location.url("/user/flightSearch");
        }

        function goToProfile() {
            $location.url("/user/profile");
        }

        function goToUserHistory() {
            $location.url("/user/userHistory");
        }

        function deleteNotification(notification, agentId) {
            MessageService
                .deleteNotification(notification, agentId)
                .then(
                    function () {
                        init();
                    },
                    function (err) {
                        vm.error = "Could not delete notification. Please try again";
                    }
                );
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