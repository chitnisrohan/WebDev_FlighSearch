(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentNotificationController", AgentNotificationController);

    function AgentNotificationController($location) {
        var vm = this;

        vm.destination = "Destination";
    }
})();