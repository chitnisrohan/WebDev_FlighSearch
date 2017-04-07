(function () {
    angular
        .module("FlightSearchApp")
        .controller("EditHotelController", EditHotelController);

    function EditHotelController($routeParams, $location, HotelService) {
        var vm = this;
        var hotelId = $routeParams['hid'];
        var userId = $routeParams['uid'];

        vm.goToHotelsList = goToHotelsList;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.updateHotel = updateHotel;

        function init() {

            HotelService
                .findHotelById(hotelId)
                .success(function (hotel) {
                    vm.hotel = hotel;
                    // console.log(hotel);
                })
        }
        init();


        function goToHotelOwnerProfile() {
            $location.url('/user-hotelowner/' + userId);
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/' + userId +'/hotel');
        }

        // function addHotel(newhotel) {
        //     HotelService
        //         .addHotel(newhotel, userId)
        //         .success(function (hotel) {
        //             if(hotel){
        //                 $location.url('/user-hotelowner/' + userId +'/hotel');
        //             }
        //         })
        // }

        function updateHotel () {
            HotelService
                .updateHotel(hotelId, vm.hotel)
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