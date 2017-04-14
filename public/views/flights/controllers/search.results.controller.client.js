(function () {
    angular
        .module("FlightSearchApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($location, FlightService, $routeParams, UserService) {
        //flight/search/SRC/:src/DEST/:dest/DEPART/:dept/RETURN/:ret/ADULTS/:adults/CHILD/:child/CLASS/:class
        var vm = this;
        var userId;
        var source = $routeParams['src'];
        var destination = $routeParams['dest'];
        var departDate = $routeParams['dept'];
        var returnDate = $routeParams['ret'];
        var noOfAdults = $routeParams['adults'];
        var noOfChildren = $routeParams['child'];
        var cabinClass = $routeParams['class'];

        vm.displayDetails = displayDetails;
        vm.getOnlyTime = getOnlyTime;
        vm.getOnlyDate = getOnlyDate;
        vm.calculateTotalDuration = calculateTotalDuration;
        vm.goToFlightSearch = goToFlightSearch;
        vm.goToNotifications = goToNotifications;
        vm.goToHistory = goToHistory;
        vm.goToProfile = goToProfile;
        vm.findCityName = findCityName;
        vm.findAllAirportCodeArray = findAllAirportCodeArray;
        vm.logout = logout;
        vm.goToHotelSearch = goToHotelSearch;

        function init() {

            findAllCityCodeArray();

            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    vm.userType = user.userType;
                    if (user) {
                        vm.isUserLoggedIn = true;
                    } else {
                        vm.isUserLoggedIn = false;
                    }
                });

            vm.flightSearchResults = '0';
            if (returnDate === "0") {
                vm.isReturnJourney = false;
            } else {
                vm.isReturnJourney = true;
            }

            var journey = {source: source, destination : destination
                , noOfAdults : noOfAdults, noOfChildren : noOfChildren,
                departDate : departDate, returnDate : returnDate
                , cabinClass : cabinClass};
            vm.userJourney = journey;
            FlightService
                .getAPIKEY()
                .success(function (API_KEY) {
                    FlightService
                        .getFlights(journey, API_KEY)
                        .success(function (flights) {
                            vm.flightSearchResults = flights;
                        })
                        .error(function (err) {
                            vm.err = err;
                        });
                })
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
            if (vm.isUserLoggedIn) {
                $location.url("/user/flightSearch");
            } else {
                $location.url("/");
            }
        }

        function goToHotelSearch() {
            if (vm.isUserLoggedIn) {
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


        function displayDetails(index) {
            vm.selectedIndex[index].showDetails = true;
        }

        function calculateTotalDuration(time1, time2) {
            if (typeof time1 != "undefined" && typeof time2 != "undefined") {
                var duration = (Date.parse(time1)/1000/60/60 - Date.parse(time2)/1000/60/60);
                var minutes;
                if (typeof duration != "undefined") {
                    if (duration.toString().indexOf(".") !== -1) {
                        minutes = (duration.toString().split(".")[1].substring(0,2) * 60 / 100).toFixed(0);
                    } else {
                        minutes = 0;
                    }
                    var totalDuration = duration.toString().split(".")[0] + "h " + minutes + "m";
                    return totalDuration;
                }
            }
        }

        function getOnlyTime(time) {
            if (typeof time != "undefined") {
                return time.split("T")[1];
            }
        }

        function getOnlyDate(time) {
            if (typeof time != "undefined") {
                return time.split("T")[1];
            }
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