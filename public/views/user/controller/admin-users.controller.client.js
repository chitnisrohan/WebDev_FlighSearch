(function () {
    angular
        .module("FlightSearchApp")
        .controller("AdminProfileController", AdminProfileController);

    function AdminProfileController($routeParams, $location, UserService) {
        var vm = this;
        var adminUserId = "58dee67efb263b7c7dd7b2c8";

        vm.goToHotels = goToHotels;
        vm.goToMessages = goToMessages;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    UserService
                        .findAllUsers()
                        .then(
                            function (users) {
                                vm.users = users.data;
                            },
                            function (err) {
                                vm.error = "Could not load users. Please try again";
                            }
                        );
                });
        }
        init();
        
        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(
                    function () {
                        init();
                    },
                    function (err) {
                        vm.error = "Could not delete user. Please try again";
                    }
                )
        }

        function goToHotels() {
            $location.url("/user/allHotels");
        }

        function goToMessages() {
            $location.url("/user/allMessages");
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