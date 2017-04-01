(function () {
    angular
        .module("FlightSearchApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .success(function (user) {
                    if(user) {
                        if (user.userType === "ADMIN") {
                            $location.url("/user/"+user._id+"/adminProfile");
                        } else {
                            $location.url("/user/"+user._id+"/flightSearch");
                        }
                    } else {
                        vm.error = "User not found";
                    }
                });
        }
    }
})();