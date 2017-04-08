(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentHistoryController", AgentHistoryController);

    function AgentHistoryController($location, $routeParams, MessageService, UserService) {
        var vm = this;
        var agentId; // = $routeParams['uid'];

        vm.deleteMessageFromHistory = deleteMessageFromHistory;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToProfile = goToProfile;
        vm.goToAgentNotification = goToAgentNotification;
        vm.logout = logout;


        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    agentId = user._id;
                    MessageService
                        .findHistory(agentId)
                        .then(
                            function (history) {
                                vm.history = history.data;
                                vm.isHistory = vm.history.length === 0;
                            },
                            function () {
                                vm.error = "Could not load history. Please try again";
                            }
                        );
                });
        }
        init();

        function goToAgentNotification() {
            $location.url("user/agentNotification");
        }

        function goToProfile() {
            $location.url("user/profile");
        }

        function goToFlightSearch() {
            $location.url("user/flightSearch");
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