(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelOwnerListController", HotelOwnerListController);

    function HotelOwnerListController($routeParams, $location, HotelService, UserService) {
        var vm = this;
        var userId;

        vm.goToNewHotel = goToNewHotel;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.updateHotelAvailibility = updateHotelAvailibility;
        vm.deleteHotel = deleteHotel;
        vm.bookHotelDates = bookHotelDates;
        vm.gotoEditHotelPage = gotoEditHotelPage;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    vm.user = user;
                    vm.userType = user.userType;
                    HotelService
                        .findHotelsByOwner(userId)
                        .success(function (hotels) {
                            vm.hotels = hotels;
                        });
                    vm.bookingDates = [];
                    vm.counter = 0;
                });
        }
        init();


        function goToNewHotel () {
            $location.url('/user-hotelowner/hotel/new');
        }

        function goToHotelOwnerProfile () {
            $location.url('/user-hotelowner/profile');
        }

        function gotoEditHotelPage (hotelId) {
            hotelIdObject = {_id : hotelId} ;
            HotelService
                .saveHotelIdOnServer(hotelIdObject)
                .success(function (boolean) {
                    $location.url('/user-hotelowner/hotel/edit');
                })
        }

        function updateHotelAvailibility (editedDetails, hotelId) {

            var bookingDate = {checkIn : editedDetails.checkIn.toISOString().substring(0,10),
                checkOut : editedDetails.checkOut.toISOString().substring(0,10)};
            HotelService
                .updateHotelAvailibility(bookingDate, hotelId)
                .success(function (hotel) {
                    if(hotel==null){
                        vm.error = "Unable to update availability of this hotel ! Please contact the admin.";
                    }
                    else
                    {
                        init();
                        vm.message = "Hotel availability successfully updated !";
                    }
                })
        }

        function deleteHotel (hotelId) {
            HotelService
                .deleteHotel(hotelId)
                .success(function (hotel) {
                    if(hotel){
                        init();
                        vm.message = "Hotel successfully deleted !";
                    }
                    else
                    {
                        vm.error = "Unable to delete this hotel. Please contact the admin !!";
                    }
                })
        }

        function bookHotelDates(CheckinDate, CheckoutDate) {
            var newdiv_from = document.createElement('div');
            newdiv_from.innerHTML = "<br><input type='date' class='form-control' ng-model='model.editedDetails.checkIn'>";
            document.getElementById(CheckinDate).appendChild(newdiv_from);
            var newdiv_to = document.createElement('div');
            newdiv_to.innerHTML = "<br><input type='date' class='form-control' ng-model='model.editedDetails.checkOut'>";
            document.getElementById(CheckoutDate).appendChild(newdiv_to);

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