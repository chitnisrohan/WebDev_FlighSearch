(function () {
    angular
        .module("FlightSearchApp")
        .controller("AdminMessagesController", AdminMessagesController);

    function AdminMessagesController($routeParams, $location, MessageService, UserService) {
        var vm = this;

        vm.goToHotels = goToHotels;
        vm.goToProfile = goToProfile;
        vm.deleteMessage = deleteMessage;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
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
                });
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
            $location.url("/user/allHotels");
        }

        function goToProfile() {
            $location.url("/user/allUsers");
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