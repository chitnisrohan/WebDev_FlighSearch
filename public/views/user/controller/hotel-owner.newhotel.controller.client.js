(function () {
    angular
        .module("FlightSearchApp")
        .controller("NewHotelController", NewHotelController);

    function NewHotelController($routeParams, $location, HotelService, UserService) {
        var vm = this;
        var userId;

        vm.goToHotelsList = goToHotelsList;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.addHotel = addHotel;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    vm.user = user;
                    vm.userType = user.userType;
                    findAllCityCodeArray();
                });

            // Get the <datalist> and <input> elements.
            var dataList = document.getElementById('cityList');
            var input = document.getElementById('city');

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

        function goToHotelOwnerProfile() {
            $location.url('/user-hotelowner/profile');
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/hotel');
        }

        function addHotel(newhotel) {
            newhotel.username = vm.user.firstName + " " + vm.user.lastName;
            HotelService
                .addHotel(newhotel, userId)
                .success(function (hotel) {
                    if(hotel){
                        $location.url('/user-hotelowner/hotel');
                    }
                })
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

        function findAllCityCodeArray() {
            // Create a new XMLHttpRequest.
            var request = new XMLHttpRequest();

            // Handle state changes for the request.
            request.onreadystatechange = function(response) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        // Parse the JSON
                        var jsonOptions = JSON.parse(request.responseText);

                        vm.allCities = jsonOptions.response;
                    }
                }
            };

            request.open('GET', 'City_Codes.json', true);
            request.send();

        }


    }
})();