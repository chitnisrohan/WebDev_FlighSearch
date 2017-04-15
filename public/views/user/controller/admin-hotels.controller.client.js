(function () {
    angular
        .module("FlightSearchApp")
        .controller("AdminHotelsController", AdminHotelsController);

    function AdminHotelsController($routeParams, $location, UserService, HotelService) {
        var vm = this;

        vm.goToMessages = goToMessages;
        vm.goToProfile = goToProfile;
        vm.deleteHotel = deleteHotel;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    HotelService
                        .findAllHotels()
                        .then(
                            function (hotels) {
                                vm.hotels = hotels.data;
                            },
                            function (err) {
                                vm.error = "Could not load hotels. Please try again";
                            }
                        );
                });
        }
        init();
        
        function deleteHotel(hotel) {
            HotelService
                .deleteHotel(hotel._id)
                .then(
                    function () {
                        init();
                    },
                    function (err) {
                        vm.error = "Could not delete Hotel. Please try again";
                    }
                );
        }

        function goToMessages() {
            $location.url("/user/allMessages");
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