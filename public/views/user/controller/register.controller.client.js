(function () {
    angular
        .module("FlightSearchApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $routeParams) {
        var vm = this;
        var userType = $routeParams['userType'];

        vm.registerUser = registerUser;

        function init() {
            vm.userType = userType;
        }
        init();

        function registerUser(newUser) {
            newUser.userType = vm.userType;
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
                                if(user.userType === "HOTELOWNER"){
                                    $location.url('/user-hotelowner/' + user._id);
                                }
                                else
                                    $location.url("/user/" + user._id);
                            });
                    });
            } else {
                vm.error = "passwords do not match";
            }
        }

    }
})();