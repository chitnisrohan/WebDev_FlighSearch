(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchController", HotelSearchController);

    function HotelSearchController($location, HotelService) {
        var vm = this;
        vm.gotoHotelResultsPage = gotoHotelResultsPage;

        function gotoHotelResultsPage(hotelBookingReq) {
            $location.url('/hotels/SearchResults/location/' + hotelBookingReq.location + '/checkin/'
                + hotelBookingReq.checkinDate.toISOString().substring(0,10) + '/checkout/' + hotelBookingReq.checkoutDate.toISOString().substring(0,10));
            // HotelService
            // .getHotelSearchUrl(hotelBookingReq)
            // .success(function (hotelUrl) {
            //     console.log(hotelUrl);
            // })
            // .error(function (err) {
            //     vm.err = err;
            // });
        }
    }
})();