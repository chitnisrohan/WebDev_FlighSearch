(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentHistoryController", AgentHistoryController);

    function AgentHistoryController($location, $routeParams, MessageService) {
        var vm = this;
        var agentId = $routeParams['uid'];

        vm.deleteMessageFromHistory = deleteMessageFromHistory;

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