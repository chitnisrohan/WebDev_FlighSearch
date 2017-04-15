(function () {
    angular
        .module("FlightSearchApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        // var userId = $routeParams['uid'];
        var userId;

        vm.update = update;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToHistory = goToHistory;
        vm.goToNotifications = goToNotifications;
        vm.AreYouSure = AreYouSure;
        vm.logout = logout;
        vm.goToHotelSearch = goToHotelSearch;

        function init() {
            UserService
                // .findUserById(userId)
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    vm.user = user;
                    vm.userType = user.userType;
                });
        }
        init();

        function goToHotelSearch() {
            $location.url("/user/hotelSearch");
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
        
        function AreYouSure() {
            if (confirm("Are you sure?") == true) {
                UserService
                    .deleteUser(userId)
                    .then(
                        function () {
                            $location.url("/");
                        },
                        function (err) {
                            vm.error = "Could not process your request. Please try again";
                        }
                    )
            } else {
            }
        }

        function goToNotifications() {
            if (vm.userType === "USER") {
                $location.url("/user/userNotification");
            } else if (vm.userType === "AGENT") {
                $location.url("/user/agentNotification");
            }
        }

        function goToFlightSearch() {
            $location.url("/user/flightSearch");
        }

        function goToHistory() {
            if (vm.userType === "USER") {
                $location.url("/user/userHistory");
            } else if (vm.userType === "AGENT") {
                $location.url("/user/agentHistory");
            }
        }

        function update(newUser) {
            var user = UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user == null) {
                        vm.error = "unable to update user";
                    } else {
                        vm.message = "user successfully updated"
                    }
                });
        }

    }
})();