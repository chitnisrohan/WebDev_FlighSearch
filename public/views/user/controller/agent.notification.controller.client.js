(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentNotificationController", AgentNotificationController);

    function AgentNotificationController($location, $routeParams, MessageService, UserService) {
        var vm = this;
        var agentId = $routeParams['uid'];

        vm.filterAlerts = filterAlerts;
        vm.clearFilterAlerts = clearFilterAlerts;
        vm.sendMessage = sendMessage;
        vm.deleteMessageForAgent = deleteMessageForAgent;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToProfile = goToProfile;
        vm.goToAgentHistory = goToAgentHistory;


        function init() {

            // can be removed on adding passportJS
            // get agent name from id
            UserService
                .findUserById(agentId)
                .then(
                    function (user) {
                        vm.agentName = user.data.firstName + " " + user.data.lastName;
                        console.log(vm.agentName);
                    },
                    function (err) {
                        vm.error = "User does not exist";
                    }
                );


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
                        vm.alertsBackup = angular.copy(vm.alerts);
                    },
                    function (err) {
                        vm.error = "Could not get alerts. Please try again";
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
            $location.url("user/"+agentId+"/agentHistory");
        }

        function goToProfile() {
            $location.url("user/"+agentId);
        }

        function goToFlightSearch() {
            $location.url("user/"+agentId+"/flightSearch");
        }

        function clearFilterAlerts() {
            vm.alerts = vm.alertsBackup;
        }

        function filterAlerts(alertFilter) {
            vm.alerts = angular.copy(vm.alertsBackup);
            var showAlerts = [];
            // alertFilter.dates.includes(a.departDate) ||
            // alertFilter.dates.includes(a.returnDate)
            for (singleAlert in vm.alerts.data) {
                var a = vm.alerts.data[singleAlert];
                if (alertFilter.dates) {
                    if (a.source === alertFilter.source ||
                        a.destination === alertFilter.destination ||
                        a.userid === alertFilter.username ||
                        a.departDate.indexOf(alertFilter.dates) !== -1 ||
                        a.returnDate.indexOf(alertFilter.dates) !== -1
                    ) {
                        showAlerts.push(a);
                    } else {
                    }
                } else {
                    if (a.source === alertFilter.source ||
                        a.destination === alertFilter.destination ||
                        a.userid === alertFilter.username
                    ) {
                        showAlerts.push(a);
                    } else {
                    }

                }

            }
            vm.alerts.data = showAlerts;
        }


    }
})();