(function () {
    angular
        .module("FlightSearchApp")
        .controller("AdminHotelsController", AdminHotelsController);

    function AdminHotelsController($routeParams, $location, UserService, HotelService) {
        var vm = this;
        var adminUserId = "58dee67efb263b7c7dd7b2c8";

        vm.goToMessages = goToMessages;
        vm.goToProfile = goToProfile;
        vm.deleteHotel = deleteHotel;

        function init() {
            HotelService
                .findAllHotels()
                .then(
                    function (hotels) {
                        vm.hotels = hotels.data;
                        console.log(hotels.data);
                    },
                    function (err) {
                        vm.error = "Could not load hotels. Please try again";
                    }
                );
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
            $location.url("/user/58dee67efb263b7c7dd7b2c8/allMessages");
        }

        function goToProfile() {
            $location.url("/user/58dee67efb263b7c7dd7b2c8/adminProfile");
        }

    }
})();