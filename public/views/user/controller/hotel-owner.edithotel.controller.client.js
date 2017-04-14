(function () {
    angular
        .module("FlightSearchApp")
        .controller("EditHotelController", EditHotelController);

    function EditHotelController($routeParams, $location, HotelService, UserService) {
        var vm = this;
        var hotelId = $routeParams['hid'];
        var userId;

        vm.goToHotelsList = goToHotelsList;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.updateHotel = updateHotel;
        vm.goToNewHotel = goToNewHotel;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    vm.user = user;
                    vm.userType = user.userType;
                    HotelService
                        .getHotelId()
                        .success(function (hotelId) {
                            vm.hotelId = hotelId._id;
                            console.log('In controller' + hotelId._id);
                            HotelService
                                .findHotelById(hotelId._id)
                                .success(function (hotel) {
                                    vm.hotel = hotel;
                                })
                        })

                });
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $location.url("/");
                    }
                );
        }

        function goToNewHotel () {
            $location.url('/user-hotelowner/hotel/new');
        }


        function goToHotelOwnerProfile() {
            $location.url('/user-hotelowner/profile');
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/hotel');
        }

        function updateHotel () {
            HotelService
                .updateHotel(vm.hotelId, vm.hotel)
                .success(function (hotel) {
                    if(hotel==null){
                        vm.error = 'Unable to update hotel. Please contact the admin !';
                    }
                    else{
                        console.log(hotel);
                        goToHotelsList();
                    }
                })

        }



    }
})();