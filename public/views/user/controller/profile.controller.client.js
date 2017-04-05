(function () {
    angular
        .module("FlightSearchApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.update = update;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToHistory = goToHistory;
        vm.goToNotifications = goToNotifications;
        vm.AreYouSure = AreYouSure;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                    vm.userType = user.userType;
                });
        }
        init();
        
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
                $location.url("/user/"+ userId +"/userNotification");
            } else if (vm.userType === "AGENT") {
                $location.url("/user/"+ userId +"/agentNotification");
            }
        }

        function goToFlightSearch() {
            $location.url("/user/" + userId + "/flightSearch");
        }

        function goToHistory() {
            if (vm.userType === "USER") {
                $location.url("/user/"+ userId +"/userHistory");
            } else if (vm.userType === "AGENT") {
                $location.url("/user/"+ userId +"/agentHistory");
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