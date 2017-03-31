(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentHistoryController", AgentHistoryController);

    function AgentHistoryController($location, $routeParams, MessageService) {
        var vm = this;
        var agentId = $routeParams['uid'];

        vm.deleteMessageFromHistory = deleteMessageFromHistory;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToProfile = goToProfile;
        vm.goToAgentNotification = goToAgentNotification;

        function init() {
            MessageService
                .findHistory(agentId)
                .then(
                    function (history) {
                        vm.history = history.data;
                    },
                    function () {
                        vm.error = "Could not load history. Please try again";
                    }
                );
        }
        init();

        function goToAgentNotification() {
            $location.url("user/"+agentId+"/agentNotification");
        }

        function goToProfile() {
            $location.url("user/"+agentId);
        }

        function goToFlightSearch() {
            $location.url("user/"+agentId+"/flightSearch");
        }

        function deleteMessageFromHistory(message) {
            MessageService
                .deleteMessageFromHistory(message.messageId, agentId)
                .then(
                    function () {
                        init();
                    }, function (err) {
                        vm.error = "Could not delete message. Please try again";
                    }
                );
        }
    }
})();