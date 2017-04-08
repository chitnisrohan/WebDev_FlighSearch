(function () {
    angular
        .module("FlightSearchApp")
        .controller("SearchController", SearchController);
    
    function SearchController($routeParams, $location, FlightService, UserService) {
        var vm = this;
        var userId; // = $routeParams['uid'];

        vm.searchFlight = searchFlight;
        vm.setUpAlert = setUpAlert;
        vm.goToHistory = goToHistory;
        vm.goToRegister = goToRegister;

        function init() {

            vm.classOptions = {availableOptions : [{id : '1',name :'ECONOMY'},
                {id : '2',name :'FIRST'},{id : '3',name :'BUSINESS'}],
            selectedOptions : {id : '1',name :'ECONOMY'}} ;

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

            // if (userId != '0' && userId) {
            //     vm.isLoggedIn = true;
            // } else {
            //     vm.isLoggedIn = false;
            // }


            // Get the <datalist> and <input> elements.
            var dataList = document.getElementById('cityFrom');
            var dataList2 = document.getElementById('cityTo');
            var input = document.getElementById('from');
            var input2 = document.getElementById('to');

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
                            var option2 = document.createElement('option');
                            option2.value = vm.allCities[cityInfo].name;
                           dataList.appendChild(option);
                           dataList2.appendChild(option2);
                        }

                        // Update the placeholder text.
                        input.placeholder = "Boston";
                        input2.placeholder = "Mumbai";
                    } else {
                        // An error occured :(
                        input.placeholder = "Couldn't load cities";
                        input2.placeholder = "Couldn't load cities";
                    }
                }
            };

            // Update the placeholder text.
            input.placeholder = "Loading options...";
            input2.placeholder = "Loading options...";

            // Set up and make the request.
            //
            request.open('GET', 'City_Codes.json', true);
//            request.open('GET', 'https://crossorigin.me/https://iatacodes.org/api/v6/cities?api_key=7cf86b00-61f2-47df-a5d0-d56b5bf819bb', true);
//    request.open('GET', 'http://cors.io/?u=http://iatacodes.org/api/v6/autocomplete?api_key=7cf86b00-61f2-47df-a5d0-d56b5bf819bb&query=boston', true);
            request.send();

            // vm.flight.noOfAdults = 1;
            // vm.flight.noOfChildren = 0;


        }
        init();

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

        function setUpAlert(journey) {
            if (journey.source && journey.destination && journey.departDate) {
                FlightService
                    .setUpAlert(journey, userId)
                    .then(
                        function (alert) {
                            vm.message = "Alert has been setup for your journey";
                        },
                        function (err) {
                            vm.error = "Could not setup alert for this journey. Please try again";
                        }
                    );
            } else {
                vm.error = "Please fill in data for creating alert";
            }
        }

        function searchFlight(journey) {
            if (!journey.noOfAdults) {
                journey.noOfAdults = 1;
            }
            if (!journey.noOfChildren) {
                journey.noOfChildren = 0;
            }
            var searchUrl;
            for (var cityInfo in vm.allCities) {
                if (vm.allCities[cityInfo].name == journey.source) {
                    journey.source = vm.allCities[cityInfo].code;
                }
                if (vm.allCities[cityInfo].name == journey.destination) {
                    journey.destination = vm.allCities[cityInfo].code;
                }
            }
            // var loggenInUser;
            // if (userId) {
            //     loggenInUser = userId;
            // } else {
            //     loggenInUser = 0;
            // }
            if (typeof journey.returnDate != "undefined") {
                searchUrl = "/flight/search/SRC/"+journey.source+"/DEST/"+journey.destination
                    +"/DEPART/"+journey.departDate.toISOString().substring(0, 10)
                    +"/RETURN/"+journey.returnDate.toISOString().substring(0, 10)
                    +"/ADULTS/"+journey.noOfAdults+"/CHILD/"+
                    journey.noOfChildren+"/CLASS/"+vm.classOptions.selectedOptions.name;
            } else {
                searchUrl = "/flight/search/SRC/"+journey.source+"/DEST/"+journey.destination
                    +"/DEPART/"+journey.departDate.toISOString().substring(0, 10)
                    +"/RETURN/"+0
                    +"/ADULTS/"+journey.noOfAdults+"/CHILD/"+
                    journey.noOfChildren+"/CLASS/"+vm.classOptions.selectedOptions.name;
            }
            $location.url(searchUrl);
        }
    }
})();