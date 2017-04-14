(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchResultsController", HotelSearchResultsController);

    function HotelSearchResultsController($routeParams, HotelService, UserService, $location) {
        var vm = this;
        var userId;

        vm.hotelLoc = $routeParams['loc'];
        vm.cinDate = $routeParams['cin'];
        vm.coutDate = $routeParams['cout'];
        vm.findCityName = findCityName;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToHistory = goToHistory;
        vm.goToProfile = goToProfile;
        vm.goToNotifications = goToNotifications;
        vm.goToHotelSearch = goToHotelSearch;

        function init() {
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


            findAllCityCodeArray();

            vm.hotelReq = {"location": vm.hotelLoc, "checkinDate": vm.cinDate, "checkoutDate": vm.coutDate};

            HotelService
                .getAPIKEY()
                .success(function (API_KEY) {
                    HotelService
                    .getHotels(vm.hotelReq, API_KEY)
                    .success(function (hotels) {
                        vm.apiHotels = hotels;
                        vm.hotelReq.location = findCityName(vm.hotelLoc);
                        HotelService
                            .getRegisteredHotels(vm.hotelReq)
                            .success(function (hotels) {
                                vm.registeredHotels = hotels;
                            });
                        });
                });
        }
        init();

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

        function findAllAirportCodeArray() {
            // Create a new XMLHttpRequest.
            var request = new XMLHttpRequest();

            // Handle state changes for the request.
            request.onreadystatechange = function(response) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        // Parse the JSON
                        var jsonOptions = JSON.parse(request.responseText);

                        vm.allAirports = jsonOptions.response;
                    }
                }
            };

            request.open('GET', 'Airport_Codes.json', true);
            request.send();

        }

        function findCityName(cityCode) {
            if (vm.allCities) {
                var city = vm.allCities.filter(function (item) {
                    return item.code === cityCode;
                });
                if (city.length > 0) {
                    return city[0].name;
                } else {
                    findAllAirportCodeArray();
                    if (vm.allAirports) {
                        var Airport = vm.allAirports.filter(function (item) {
                            return item.code === cityCode;
                        });
                        return Airport[0].name;
                    }
                }
            }
        }

        function goToFlightSearch() {
            if (vm.isLoggedIn) {
                $location.url("/user/flightSearch");
            } else {
                $location.url("/");
            }
        }

        function goToHotelSearch() {
            if (vm.isLoggedIn) {
                $location.url("/user/hotelSearch");
            } else {
                $location.url("/hotelSearch");
            }
        }

        function goToNotifications() {
            if (vm.userType === "USER") {
                $location.url("/user/userNotification");
            } else if (vm.userType === "AGENT") {
                $location.url("/user/agentNotification");
            }
        }

        function goToProfile() {
            $location.url("/user/profile");
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