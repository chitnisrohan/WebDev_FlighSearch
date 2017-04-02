(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchResultsController", HotelSearchResultsController);

    function HotelSearchResultsController($routeParams, HotelService) {
        var vm = this;

        vm.hotelLoc = $routeParams['loc'];
        vm.cinDate = $routeParams['cin'];
        vm.coutDate = $routeParams['cout'];

        function init() {
            vm.hotelReq = {"location": vm.hotelLoc, "checkinDate": vm.cinDate, "checkoutDate": vm.coutDate};

            HotelService
                .getHotels(vm.hotelReq)
                .success(function (hotels) {
                    vm.apiHotels = hotels;
                    HotelService
                        .getRegisteredHotels(vm.hotelReq)
                        .success(function (hotels) {
                            vm.registeredHotels = hotels;
                        });
                });


        }
        init();

    }
})();