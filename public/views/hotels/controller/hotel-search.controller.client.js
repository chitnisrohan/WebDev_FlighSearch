(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchController", HotelSearchController);

    function HotelSearchController($location, HotelService) {
        var vm = this;
        vm.gotoHotelResultsPage = gotoHotelResultsPage;
        vm.goToOwnerRegisterPage = goToOwnerRegisterPage;

        function gotoHotelResultsPage(hotelBookingReq) {
            $location.url('/hotels/SearchResults/location/' + hotelBookingReq.location + '/checkin/'
                + hotelBookingReq.checkinDate.toISOString().substring(0,10) + '/checkout/' + hotelBookingReq.checkoutDate.toISOString().substring(0,10));

        }

        function goToOwnerRegisterPage (userType) {
            $location.url("/register/" + userType);
        }
    }
})();