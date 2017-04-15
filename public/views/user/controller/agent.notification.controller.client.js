(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentNotificationController", AgentNotificationController);

    function AgentNotificationController($location, $routeParams, MessageService, UserService) {
        var vm = this;
        var agentId; // = $routeParams['uid'];

        vm.filterAlerts = filterAlerts;
        vm.clearFilterAlerts = clearFilterAlerts;
        vm.sendMessage = sendMessage;
        vm.deleteMessageForAgent = deleteMessageForAgent;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToProfile = goToProfile;
        vm.goToAgentHistory = goToAgentHistory;
        vm.logout = logout;
        vm.goToHotelSearch = goToHotelSearch;


        function init() {

            // can be removed on adding passportJS
            // get agent name from id
            UserService
                .findCurrentUser()
                .then(
                    function (user) {
                        agentId = user.data._id;
                        vm.agentName = user.data.firstName + " " + user.data.lastName;

                        MessageService
                            .findAlerts()
                            .then(
                                function (alerts) {
                                    var alerts2 = [];
                                    for (var a in alerts.data) {
                                        var alert = alerts.data[a];
                                        var agentList = alert.NotVisibleForAgents;
                                        var agentList2 = [];
                                        for (var agentIdWhoResponded in alert.AgentsResponded) {
                                            agentList2.push(alert.AgentsResponded[agentIdWhoResponded]._id);
                                        }
                                        if (agentList.includes(agentId) || agentList2.includes(agentId)) {
                                        } else {
                                            alerts2.push(alert);
                                        }
                                    }
                                    vm.alerts = alerts2;
                                    vm.isAlerts = vm.alerts.length === 0;
                                    vm.alertsBackup = angular.copy(vm.alerts);
                                },
                                function (err) {
                                    vm.error = "Could not get alerts. Please try again";
                                }
                            );
                    },
                    function (err) {
                        vm.error = "User does not exist";
                    }
                );


        }
        init();

        function deleteMessageForAgent(alert) {
            MessageService
                .deleteMessageForAgent(alert, agentId)
                .then(
                    function (alerts) {
                        init();
                        vm.message = "Alert deleted";
                    },
                    function (err) {
                        vm.error = "Could not delete alert. Please try again";
                    }
                );
        }

        function sendMessage(alert, message) {
            alert.response = true;
            var messageMap = {_id : agentId, message : message, visible: true, agentName : vm.agentName};
            MessageService
                .sendMessage(alert, messageMap)
                .then(
                    function (alerts) {
                        vm.message = "Message sent!";
                        init();
                    },
                    function (err) {
                        vm.error = "Could not send message. Please try again";
                    }
                );
        }

        function goToAgentHistory() {
            $location.url("user/agentHistory");
        }

        function goToProfile() {
            $location.url("user/profile");
        }

        function goToFlightSearch() {
            $location.url("user/flightSearch");
        }

        function clearFilterAlerts() {
            vm.alerts = angular.copy(vm.alertsBackup);
        }

        function filterAlerts(alertFilter) {
            vm.alerts = angular.copy(vm.alertsBackup);
            var showAlerts = [];
            // alertFilter.dates.includes(a.departDate) ||
            // alertFilter.dates.includes(a.returnDate)
            for (singleAlert in vm.alerts) {
                var a = vm.alerts[singleAlert];
                if (alertFilter.dates) {
                    if (a.returnDate) {
                        if (a.source === alertFilter.source ||
                            a.destination === alertFilter.destination ||
                            a.username.indexOf(alertFilter.username) !== -1 ||
                            a.departDate.indexOf(alertFilter.dates) !== -1 ||
                            a.returnDate.indexOf(alertFilter.dates) !== -1
                        ) {
                            showAlerts.push(a);
                        } else {
                        }
                    } else {
                        if (a.source === alertFilter.source ||
                            a.destination === alertFilter.destination ||
                            a.username.indexOf(alertFilter.username) !== -1 ||
                            a.departDate.indexOf(alertFilter.dates) !== -1
                        ) {
                            showAlerts.push(a);
                        } else {
                        }
                    }

                } else {
                    if (a.source === alertFilter.source ||
                        a.destination === alertFilter.destination ||
                        a.username.indexOf(alertFilter.username) !== -1
                    ) {
                        showAlerts.push(a);
                    } else {
                    }

                }

            }
            vm.alerts = showAlerts;
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