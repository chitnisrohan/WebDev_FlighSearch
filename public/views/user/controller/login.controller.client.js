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
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "User not found";
                    }
                });
        }
    }
})();