(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentHistoryController", AgentHistoryController);

    function AgentHistoryController($location) {
        var vm = this;

        vm.destination = "Destination";
    }
})();