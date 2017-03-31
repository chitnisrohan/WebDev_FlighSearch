(function () {
    angular
        .module("FlightSearchApp")
        .controller("UserNotificationController", UserNotificationController);

    function UserNotificationController($location, $routeParams, MessageService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.deleteNotification = deleteNotification;

        function init() {
            MessageService
                .getAllNotification(userId)
                .then(
                    function (notifications) {
                        var validNotifications = [];
                        for (var n in notifications.data) {
                            var notification = notifications.data[n];
//                            console.log(notification);
                            var msgs = notification.AgentsResponded;
                            var validMsgs = [];
                            for (var i = 0; i < msgs.length ; i++) {
                                var msg = msgs[i];
                                if (msg.visible) {
                                    validMsgs.push(msg);
                                }
                            }
                            console.log(validMsgs);
//                            console.log(notification);
                            notification.AgentsResponded = validMsgs;
                            validNotifications.push(notification);
                        }
                        vm.notifications = validNotifications;
                        vm.noNitifications = vm.notifications.length === 0;
                    },
                    function (err) {
                        vm.error = "Could not load notifications. Please try again";
                    }
                );
        }
        init();

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
    }
})();