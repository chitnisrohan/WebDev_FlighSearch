(function () {
    angular
        .module("FlightSearchApp")
        .controller("AdminHotelsController", AdminHotelsController);

    function AdminHotelsController($routeParams, $location, UserService) {
        var vm = this;
        var adminUserId = "58dee67efb263b7c7dd7b2c8";

        vm.goToMessages = goToMessages;
        vm.goToProfile = goToProfile;

        function init() {
        }
        init();

        function goToMessages() {
            $location.url("/user/58dee67efb263b7c7dd7b2c8/allMessages");
        }

        function goToProfile() {
            $location.url("/user/58dee67efb263b7c7dd7b2c8/adminProfile");
        }

    }
})();