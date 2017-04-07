(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelOwnerListController", HotelOwnerListController);

    function HotelOwnerListController($routeParams, $location, HotelService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.goToNewHotel = goToNewHotel;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.updateHotelAvailibility = updateHotelAvailibility;
        vm.deleteHotel = deleteHotel;
        vm.bookHotelDates = bookHotelDates;
        vm.gotoEditHotelPage = gotoEditHotelPage;

        function init() {
            HotelService
                .findHotelsByOwner(userId)
                .success(function (hotels) {
                    vm.hotels = hotels;
                    console.log(hotels);
                });
            vm.bookingDates = [];
            vm.counter = 0;
        }
        init();


        function goToNewHotel () {
            $location.url('/user-hotelowner/' + userId +'/hotel/new');
        }

        function goToHotelOwnerProfile () {
            $location.url('/user-hotelowner/' + userId);
        }

        function gotoEditHotelPage (hotelId) {
            $location.url('/user-hotelowner/' + userId + '/hotel/' + hotelId);
        }

        function updateHotelAvailibility (editedDetails, hotelId) {
            // var available_from = editedDetails.available_from.toISOString().substring(0,10);
            // var available_till = editedDetails.available_till.toISOString().substring(0,10);
            // editedDetails.available_from = available_from;
            // editedDetails.available_till = available_till;

            var bookingDate = {checkIn : editedDetails.checkIn.toISOString().substring(0,10),
                checkOut : editedDetails.checkOut.toISOString().substring(0,10)};
            console.log(bookingDate);
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
            // var idForCheckIn = "CheckIn"+vm.counter;
            // var idForCheckOut = "CheckOut"+vm.counter;
            // var a = document.getElementById("CheckIn"+vm.counter).value;
            // var b = document.getElementById("CheckOut"+vm.counter).value;
            // vm.bookingDates.push({checkin : a, checkout : b});

            var newdiv_from = document.createElement('div');
            newdiv_from.innerHTML = "<br><input type='date' class='form-control' ng-model='model.editedDetails.checkIn'>";
            document.getElementById(CheckinDate).appendChild(newdiv_from);
            var newdiv_to = document.createElement('div');
            newdiv_to.innerHTML = "<br><input type='date' class='form-control' ng-model='model.editedDetails.checkOut'>";
            document.getElementById(CheckoutDate).appendChild(newdiv_to);

        }

    }
})();