(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchController", HotelSearchController);

    function HotelSearchController($location, UserService) {
        var vm = this;
        vm.gotoHotelResultsPage = gotoHotelResultsPage;
        vm.goToOwnerRegisterPage = goToOwnerRegisterPage;
        vm.goToHistory = goToHistory;
        vm.goToRegister = goToRegister;

        function init () {

            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    if(user) {
                        vm.isLoggedIn = true;
                    } else {
                        vm.isLoggedIn = false;
                    }
                    vm.userType = user.userType;
                });

            // Get the <datalist> and <input> elements.
            var dataList = document.getElementById('locationList');
            var input = document.getElementById('location');

            // Create a new XMLHttpRequest.
            var request = new XMLHttpRequest();

            // Handle state changes for the request.
            request.onreadystatechange = function(response) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        // Parse the JSON
                        var jsonOptions = JSON.parse(request.responseText);
                        vm.allCities = jsonOptions.response;
                        for (var cityInfo in vm.allCities) {
                            var option = document.createElement('option');
                            option.value = vm.allCities[cityInfo].name;
                            dataList.appendChild(option);
                        }
                        // Update the placeholder text.
                        input.placeholder = "Boston";
                    } else {
                        // An error occured :(
                        input.placeholder = "Couldn't load cities";
                    }
                }
            };

            // Update the placeholder text.
            input.placeholder = "Loading options...";

            request.open('GET', 'City_Codes.json', true);
            request.send();

        }
        init();

        function gotoHotelResultsPage(hotelBookingReq) {
            for (var cityInfo in vm.allCities) {
                if (vm.allCities[cityInfo].name == hotelBookingReq.location) {
                    hotelBookingReq.location = vm.allCities[cityInfo].code;
                }
            }
            $location.url('/hotels/SearchResults/location/' + hotelBookingReq.location + '/checkin/'
                + hotelBookingReq.checkinDate.toISOString().substring(0,10) + '/checkout/' + hotelBookingReq.checkoutDate.toISOString().substring(0,10));

        }

        function goToOwnerRegisterPage (userType) {
            $location.url("/register/" + userType);
        }

        function goToRegister(userType) {
            $location.url("/register/" + userType);
        }

        function goToHistory() {
            if (vm.userType === "USER") {
                $location.url("/user/userHistory");
            } else if (vm.userType === "AGENT") {
                $location.url("/user/agentHistory");
            }
        }
    }
})();