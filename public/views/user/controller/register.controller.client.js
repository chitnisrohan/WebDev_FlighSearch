(function () {
    angular
        .module("FlightSearchApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.registerUser = registerUser;

        function registerUser(newUser) {
            if (newUser.password === newUser.verify.password) {
                UserService
                    .findUserByUsername(newUser.username)
                    .success(function (user) {
                        vm.error = 'Username already exists'
                    })
                    .error(function () {
                        UserService
                            .createUser(newUser)
                            .success(function (user) {
                                $location.url("/user/" + user._id);
                            });
                    });
            } else {
                vm.error = "passwords do not match";
            }
        }

    }
})();