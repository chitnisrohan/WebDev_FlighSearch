(function () {
    angular
        .module("FlightSearchApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.update = update;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToUserHistory = goToUserHistory;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                });
        }
        init();

        function goToFlightSearch() {
            $location.url("/user/" + userId + "/flightSearch");
        }

        function goToUserHistory() {
            $location.url("/user/"+ userId + "/userHistory");
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