(function () {
    angular
        .module("FlightSearchApp")
        .controller("NewHotelController", NewHotelController);

    function NewHotelController($routeParams, $location, HotelService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.goToHotelsList = goToHotelsList;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.addHotel = addHotel;

        function init() {

        }
        init();

        function goToHotelOwnerProfile() {
            $location.url('/user-hotelowner/' + userId);
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/' + userId +'/hotel');
        }

        function addHotel(newhotel) {
            HotelService
                .addHotel(newhotel, userId)
                .success(function (hotel) {
                    if(hotel){
                        $location.url('/user-hotelowner/' + userId +'/hotel');
                    }
                })
        }


    }
})();