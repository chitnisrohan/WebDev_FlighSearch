(function () {
    angular
        .module("FlightSearchApp")
        .controller("AdminMessagesController", AdminMessagesController);

    function AdminMessagesController($routeParams, $location, MessageService) {
        var vm = this;
        var adminUserId = "58dee67efb263b7c7dd7b2c8";

        vm.goToHotels = goToHotels;
        vm.goToProfile = goToProfile;
        vm.deleteMessage = deleteMessage;

        function init() {
            MessageService
                .findAllMessages()
                .then(
                    function (messages) {
                        vm.messages = messages.data;
                    },
                    function (err) {
                        vm.error = "Could not load users. Please try again";
                    }
                );
        }
        init();

        function deleteMessage(message) {
            MessageService
                .deleteAlert(message._id)
                .then(
                    function (alerts) {
                        init();
                    },
                    function (err) {
                        vm.error = "Could not delete alert";
                    }
                );
        }

        function goToHotels() {
            $location.url("/user/58dee67efb263b7c7dd7b2c8/allHotels");
        }

        function goToProfile() {
            $location.url("/user/58dee67efb263b7c7dd7b2c8/adminProfile");
        }

    }
})();