(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchResultsController", HotelSearchResultsController);

    function HotelSearchResultsController($routeParams, HotelService) {
        var vm = this;

        vm.hotelLoc = $routeParams['loc'];
        vm.cinDate = $routeParams['cin'];
        vm.coutDate = $routeParams['cout'];
        vm.findCityName = findCityName;

        function init() {
            findAllCityCodeArray();

            vm.hotelReq = {"location": vm.hotelLoc, "checkinDate": vm.cinDate, "checkoutDate": vm.coutDate};

            HotelService
                .getHotels(vm.hotelReq)
                .success(function (hotels) {
                    vm.apiHotels = hotels;
                    vm.hotelReq.location = findCityName(vm.hotelLoc);
                    HotelService
                        .getRegisteredHotels(vm.hotelReq)
                        .success(function (hotels) {
                            vm.registeredHotels = hotels;
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

    }
})();