(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchResultsController", HotelSearchResultsController);

    function HotelSearchResultsController($routeParams, HotelService) {
        var vm = this;

        var hotelLoc = $routeParams['loc'];
        var cinDate = $routeParams['cin'];
        var coutDate = $routeParams['cout'];

        vm.hotelReq = {"location": hotelLoc, "checkinDate": cinDate, "checkoutDate": coutDate};

        function init() {

            HotelService
                .getHotels(vm.hotelReq)
                .success(function (hotels) {
                    vm.hotels = hotels;
                })
                .error(function (err) {
                    vm.err = err;
                });

        }
        init();


        // function getHotels(hotelBookingReq) {

        //
        // }
    }
})();