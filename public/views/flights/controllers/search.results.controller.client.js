(function () {
    angular
        .module("FlightSearchApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($location, FlightService, $routeParams) {
        //flight/search/SRC/:src/DEST/:dest/DEPART/:dept/RETURN/:ret/ADULTS/:adults/CHILD/:child/CLASS/:class
        var vm = this;
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

        function init() {
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
                .getFlights(journey)
                .success(function (flights) {
                    vm.flightSearchResults = flights;
                    console.log(vm.flightSearchResults);
                })
                .error(function (err) {
                    vm.err = err;
                });
        }
        init();

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

        vm.flightSearchResults = {
        //         "results"
        // :
        //     [{
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:20",
        //                     "arrives_at": "2017-03-29T08:40",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "C"
        //                     },
        //                     "destination": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "138",
        //                     "aircraft": "330",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "W",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-29T11:10",
        //                     "arrives_at": "2017-03-29T12:40",
        //                     "origin": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "162",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "S",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T08:50",
        //                     "arrives_at": "2017-04-04T10:10",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "153",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "R",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T11:30",
        //                     "arrives_at": "2017-04-04T13:30",
        //                     "origin": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "C"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "137",
        //                     "aircraft": "330",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "W",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }, {
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:20",
        //                     "arrives_at": "2017-03-29T08:40",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "C"
        //                     },
        //                     "destination": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "138",
        //                     "aircraft": "330",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "W",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-29T12:00",
        //                     "arrives_at": "2017-03-29T13:30",
        //                     "origin": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "164",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "S",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T08:50",
        //                     "arrives_at": "2017-04-04T10:10",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "153",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "R",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T11:30",
        //                     "arrives_at": "2017-04-04T13:30",
        //                     "origin": {
        //                         "airport": "DUB",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "C"
        //                     },
        //                     "marketing_airline": "EI",
        //                     "operating_airline": "EI",
        //                     "flight_number": "137",
        //                     "aircraft": "330",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "W",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "2174.96",
        //             "price_per_adult": {
        //                 "total_fare": "596.11",
        //                 "tax": "302.11"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T18:20",
        //                     "arrives_at": "2017-03-29T05:50",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "C"
        //                     },
        //                     "destination": {
        //                         "airport": "LIS",
        //                         "terminal": "1"
        //                     },
        //                     "marketing_airline": "TP",
        //                     "operating_airline": "TP",
        //                     "flight_number": "218",
        //                     "aircraft": "332",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-29T07:05",
        //                     "arrives_at": "2017-03-29T09:45",
        //                     "origin": {
        //                         "airport": "LIS",
        //                         "terminal": "1"
        //                     },
        //                     "destination": {
        //                         "airport": "LGW",
        //                         "terminal": "S"
        //                     },
        //                     "marketing_airline": "TP",
        //                     "operating_airline": "TP",
        //                     "flight_number": "336",
        //                     "aircraft": "319",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T06:00",
        //                     "arrives_at": "2017-04-04T08:35",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "LIS",
        //                         "terminal": "1"
        //                     },
        //                     "marketing_airline": "TP",
        //                     "operating_airline": "TP",
        //                     "flight_number": "361",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T10:45",
        //                     "arrives_at": "2017-04-04T13:20",
        //                     "origin": {
        //                         "airport": "LIS",
        //                         "terminal": "1"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "TP",
        //                     "operating_airline": "TP",
        //                     "flight_number": "217",
        //                     "aircraft": "332",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "2541.92",
        //             "price_per_adult": {
        //                 "total_fare": "682.35",
        //                 "tax": "480.35"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T23:35",
        //                     "arrives_at": "2017-03-29T16:10",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "IST",
        //                         "terminal": "I"
        //                     },
        //                     "marketing_airline": "TK",
        //                     "operating_airline": "TK",
        //                     "flight_number": "82",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "W",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-29T20:20",
        //                     "arrives_at": "2017-03-29T22:30",
        //                     "origin": {
        //                         "airport": "IST",
        //                         "terminal": "I"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "TK",
        //                     "operating_airline": "TK",
        //                     "flight_number": "1987",
        //                     "aircraft": "32B",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "W",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T06:45",
        //                     "arrives_at": "2017-04-04T12:35",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "IST",
        //                         "terminal": "I"
        //                     },
        //                     "marketing_airline": "TK",
        //                     "operating_airline": "TK",
        //                     "flight_number": "1988",
        //                     "aircraft": "32B",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "U",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T14:35",
        //                     "arrives_at": "2017-04-04T18:15",
        //                     "origin": {
        //                         "airport": "IST",
        //                         "terminal": "I"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "TK",
        //                     "operating_airline": "TK",
        //                     "flight_number": "81",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "U",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "2570.16",
        //             "price_per_adult": {
        //                 "total_fare": "707.91",
        //                 "tax": "558.91"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:00",
        //                     "arrives_at": "2017-03-29T04:40",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "KEF"
        //                     },
        //                     "marketing_airline": "WW",
        //                     "operating_airline": "WW",
        //                     "flight_number": "126",
        //                     "aircraft": "321",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "O",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-29T06:10",
        //                     "arrives_at": "2017-03-29T10:25",
        //                     "origin": {
        //                         "airport": "KEF"
        //                     },
        //                     "destination": {
        //                         "airport": "LGW",
        //                         "terminal": "S"
        //                     },
        //                     "marketing_airline": "WW",
        //                     "operating_airline": "WW",
        //                     "flight_number": "810",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "O",
        //                         "seats_remaining": 5
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T11:40",
        //                     "arrives_at": "2017-04-04T14:00",
        //                     "origin": {
        //                         "airport": "LGW",
        //                         "terminal": "S"
        //                     },
        //                     "destination": {
        //                         "airport": "KEF"
        //                     },
        //                     "marketing_airline": "WW",
        //                     "operating_airline": "WW",
        //                     "flight_number": "811",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "Q",
        //                         "seats_remaining": 6
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T15:30",
        //                     "arrives_at": "2017-04-04T17:30",
        //                     "origin": {
        //                         "airport": "KEF"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "WW",
        //                     "operating_airline": "WW",
        //                     "flight_number": "125",
        //                     "aircraft": "321",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "Q",
        //                         "seats_remaining": 8
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "2945.76",
        //             "price_per_adult": {
        //                 "total_fare": "834.31",
        //                 "tax": "325.31"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:30",
        //                     "arrives_at": "2017-03-29T06:30",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "KEF"
        //                     },
        //                     "marketing_airline": "FI",
        //                     "operating_airline": "FI",
        //                     "flight_number": "630",
        //                     "aircraft": "76W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-29T07:35",
        //                     "arrives_at": "2017-03-29T11:35",
        //                     "origin": {
        //                         "airport": "KEF"
        //                     },
        //                     "destination": {
        //                         "airport": "LGW",
        //                         "terminal": "N"
        //                     },
        //                     "marketing_airline": "FI",
        //                     "operating_airline": "FI",
        //                     "flight_number": "470",
        //                     "aircraft": "75W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T13:10",
        //                     "arrives_at": "2017-04-04T15:10",
        //                     "origin": {
        //                         "airport": "LGW",
        //                         "terminal": "N"
        //                     },
        //                     "destination": {
        //                         "airport": "KEF"
        //                     },
        //                     "marketing_airline": "FI",
        //                     "operating_airline": "FI",
        //                     "flight_number": "471",
        //                     "aircraft": "75W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "Q",
        //                         "seats_remaining": 6
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T17:00",
        //                     "arrives_at": "2017-04-04T18:35",
        //                     "origin": {
        //                         "airport": "KEF"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "FI",
        //                     "operating_airline": "FI",
        //                     "flight_number": "631",
        //                     "aircraft": "76W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "Q",
        //                         "seats_remaining": 8
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "3855.84",
        //             "price_per_adult": {
        //                 "total_fare": "1100.33",
        //                 "tax": "385.33"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T17:30",
        //                     "arrives_at": "2017-03-28T18:45",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "B"
        //                     },
        //                     "destination": {
        //                         "airport": "YUL"
        //                     },
        //                     "marketing_airline": "UA",
        //                     "operating_airline": "UA",
        //                     "flight_number": "8363",
        //                     "aircraft": "CRJ",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 7
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-28T19:45",
        //                     "arrives_at": "2017-03-29T07:25",
        //                     "origin": {
        //                         "airport": "YUL"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "UA",
        //                     "operating_airline": "AC",
        //                     "flight_number": "8296",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 7
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T13:45",
        //                     "arrives_at": "2017-04-04T16:30",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "ZRH"
        //                     },
        //                     "marketing_airline": "UA",
        //                     "operating_airline": "LX",
        //                     "flight_number": "9759",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 4
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T17:30",
        //                     "arrives_at": "2017-04-04T19:55",
        //                     "origin": {
        //                         "airport": "ZRH"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "UA",
        //                     "operating_airline": "LX",
        //                     "flight_number": "9722",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 4
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "5177.68",
        //             "price_per_adult": {
        //                 "total_fare": "1468.29",
        //                 "tax": "453.29"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T17:30",
        //                     "arrives_at": "2017-03-28T18:45",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "B"
        //                     },
        //                     "destination": {
        //                         "airport": "YUL"
        //                     },
        //                     "marketing_airline": "AC",
        //                     "operating_airline": "AC",
        //                     "flight_number": "8463",
        //                     "aircraft": "CRJ",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-28T19:45",
        //                     "arrives_at": "2017-03-29T07:25",
        //                     "origin": {
        //                         "airport": "YUL"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "AC",
        //                     "operating_airline": "AC",
        //                     "flight_number": "864",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T11:05",
        //                     "arrives_at": "2017-04-04T13:45",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "YHZ"
        //                     },
        //                     "marketing_airline": "AC",
        //                     "operating_airline": "AC",
        //                     "flight_number": "861",
        //                     "aircraft": "763",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T16:00",
        //                     "arrives_at": "2017-04-04T16:29",
        //                     "origin": {
        //                         "airport": "YHZ"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "B"
        //                     },
        //                     "marketing_airline": "AC",
        //                     "operating_airline": "AC",
        //                     "flight_number": "8895",
        //                     "aircraft": "CRJ",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "5197.04",
        //             "price_per_adult": {
        //                 "total_fare": "1473.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:40",
        //                     "arrives_at": "2017-03-28T21:19",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "B"
        //                     },
        //                     "destination": {
        //                         "airport": "IAD"
        //                     },
        //                     "marketing_airline": "LH",
        //                     "operating_airline": "UA",
        //                     "flight_number": "7513",
        //                     "aircraft": "738",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 4
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-28T22:00",
        //                     "arrives_at": "2017-03-29T10:30",
        //                     "origin": {
        //                         "airport": "IAD"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "LH",
        //                     "operating_airline": "UA",
        //                     "flight_number": "9267",
        //                     "aircraft": "777",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 4
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T10:55",
        //                     "arrives_at": "2017-04-04T13:40",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "MUC",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "LH",
        //                     "operating_airline": "LH",
        //                     "flight_number": "2473",
        //                     "aircraft": "321",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T15:55",
        //                     "arrives_at": "2017-04-04T18:35",
        //                     "origin": {
        //                         "airport": "MUC",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "LH",
        //                     "operating_airline": "LH",
        //                     "flight_number": "424",
        //                     "aircraft": "359",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "5280.52",
        //             "price_per_adult": {
        //                 "total_fare": "1494.00",
        //                 "tax": "479.00"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:45",
        //                     "arrives_at": "2017-03-29T11:00",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "ZRH"
        //                     },
        //                     "marketing_airline": "LX",
        //                     "operating_airline": "LX",
        //                     "flight_number": "53",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-03-29T12:05",
        //                     "arrives_at": "2017-03-29T13:00",
        //                     "origin": {
        //                         "airport": "ZRH"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "marketing_airline": "LX",
        //                     "operating_airline": "LX",
        //                     "flight_number": "332",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T13:45",
        //                     "arrives_at": "2017-04-04T16:30",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "2"
        //                     },
        //                     "destination": {
        //                         "airport": "ZRH"
        //                     },
        //                     "marketing_airline": "LX",
        //                     "operating_airline": "LX",
        //                     "flight_number": "333",
        //                     "aircraft": "320",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }, {
        //                     "departs_at": "2017-04-04T17:30",
        //                     "arrives_at": "2017-04-04T19:55",
        //                     "origin": {
        //                         "airport": "ZRH"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "LX",
        //                     "operating_airline": "LX",
        //                     "flight_number": "52",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "V",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "5312.16",
        //             "price_per_adult": {
        //                 "total_fare": "1501.91",
        //                 "tax": "486.91"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:55",
        //                     "arrives_at": "2017-03-29T09:15",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "marketing_airline": "VS",
        //                     "operating_airline": "VS",
        //                     "flight_number": "12",
        //                     "aircraft": "789",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T17:25",
        //                     "arrives_at": "2017-04-04T19:35",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "VS",
        //                     "operating_airline": "VS",
        //                     "flight_number": "11",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": true,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:55",
        //                     "arrives_at": "2017-03-29T09:15",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "marketing_airline": "VS",
        //                     "operating_airline": "VS",
        //                     "flight_number": "12",
        //                     "aircraft": "789",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T17:25",
        //                     "arrives_at": "2017-04-04T19:35",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "DL",
        //                     "operating_airline": "VS",
        //                     "flight_number": "4378",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": true,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:55",
        //                     "arrives_at": "2017-03-29T09:15",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "marketing_airline": "DL",
        //                     "operating_airline": "VS",
        //                     "flight_number": "4379",
        //                     "aircraft": "789",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T17:25",
        //                     "arrives_at": "2017-04-04T19:35",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "VS",
        //                     "operating_airline": "VS",
        //                     "flight_number": "11",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "L",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": true,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T21:55",
        //                     "arrives_at": "2017-03-29T09:15",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "marketing_airline": "DL",
        //                     "operating_airline": "VS",
        //                     "flight_number": "4379",
        //                     "aircraft": "789",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T17:25",
        //                     "arrives_at": "2017-04-04T19:35",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "DL",
        //                     "operating_airline": "VS",
        //                     "flight_number": "4378",
        //                     "aircraft": "333",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": true,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:20",
        //                     "arrives_at": "2017-03-29T06:50",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "marketing_airline": "BA",
        //                     "operating_airline": "BA",
        //                     "flight_number": "212",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 8
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T11:15",
        //                     "arrives_at": "2017-04-04T13:30",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "BA",
        //                     "operating_airline": "BA",
        //                     "flight_number": "213",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:20",
        //                     "arrives_at": "2017-03-29T06:50",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "marketing_airline": "IB",
        //                     "operating_airline": "BA",
        //                     "flight_number": "4639",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T11:15",
        //                     "arrives_at": "2017-04-04T13:30",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "IB",
        //                     "operating_airline": "BA",
        //                     "flight_number": "4638",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:20",
        //                     "arrives_at": "2017-03-29T06:50",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "marketing_airline": "AY",
        //                     "operating_airline": "BA",
        //                     "flight_number": "5412",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 8
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T11:15",
        //                     "arrives_at": "2017-04-04T13:30",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "AY",
        //                     "operating_airline": "BA",
        //                     "flight_number": "5413",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 5
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:20",
        //                     "arrives_at": "2017-03-29T06:50",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "marketing_airline": "AA",
        //                     "operating_airline": "BA",
        //                     "flight_number": "6163",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 7
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T11:15",
        //                     "arrives_at": "2017-04-04T13:30",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "5"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "AA",
        //                     "operating_airline": "BA",
        //                     "flight_number": "6164",
        //                     "aircraft": "744",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "H",
        //                         "seats_remaining": 5
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": false,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:18",
        //                     "arrives_at": "2017-03-29T07:05",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "A"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "marketing_airline": "AF",
        //                     "operating_airline": "DL",
        //                     "flight_number": "3681",
        //                     "aircraft": "76W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "K",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T09:40",
        //                     "arrives_at": "2017-04-04T12:16",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "AF",
        //                     "operating_airline": "DL",
        //                     "flight_number": "3610",
        //                     "aircraft": "76W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "K",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": true,
        //                 "change_penalties": true
        //             }
        //         }
        //     }, {
        //         "itineraries": [{
        //             "outbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-03-28T19:18",
        //                     "arrives_at": "2017-03-29T07:05",
        //                     "origin": {
        //                         "airport": "BOS",
        //                         "terminal": "A"
        //                     },
        //                     "destination": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "marketing_airline": "KL",
        //                     "operating_airline": "DL",
        //                     "flight_number": "6186",
        //                     "aircraft": "76W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "K",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             },
        //             "inbound": {
        //                 "flights": [{
        //                     "departs_at": "2017-04-04T09:40",
        //                     "arrives_at": "2017-04-04T12:16",
        //                     "origin": {
        //                         "airport": "LHR",
        //                         "terminal": "3"
        //                     },
        //                     "destination": {
        //                         "airport": "BOS",
        //                         "terminal": "E"
        //                     },
        //                     "marketing_airline": "KL",
        //                     "operating_airline": "DL",
        //                     "flight_number": "6187",
        //                     "aircraft": "76W",
        //                     "booking_info": {
        //                         "travel_class": "ECONOMY",
        //                         "booking_code": "K",
        //                         "seats_remaining": 9
        //                     }
        //                 }]
        //             }
        //         }],
        //         "fare": {
        //             "total_price": "8807.04",
        //             "price_per_adult": {
        //                 "total_fare": "2504.13",
        //                 "tax": "458.13"
        //             },
        //             "restrictions": {
        //                 "refundable": true,
        //                 "change_penalties": true
        //             }
        //         }
        //     }]

            // "results": [
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T18:20",
            //                             "arrives_at": "2017-03-29T05:50",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "C"
            //                             },
            //                             "destination": {
            //                                 "airport": "LIS",
            //                                 "terminal": "1"
            //                             },
            //                             "marketing_airline": "TP",
            //                             "operating_airline": "TP",
            //                             "flight_number": "218",
            //                             "aircraft": "332",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "L",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T07:05",
            //                             "arrives_at": "2017-03-29T09:45",
            //                             "origin": {
            //                                 "airport": "LIS",
            //                                 "terminal": "1"
            //                             },
            //                             "destination": {
            //                                 "airport": "LGW",
            //                                 "terminal": "S"
            //                             },
            //                             "marketing_airline": "TP",
            //                             "operating_airline": "TP",
            //                             "flight_number": "336",
            //                             "aircraft": "319",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "L",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "1088.44",
            //             "price_per_adult": {
            //                 "total_fare": "272.11",
            //                 "tax": "171.11"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:00",
            //                             "arrives_at": "2017-03-29T04:40",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "KEF"
            //                             },
            //                             "marketing_airline": "WW",
            //                             "operating_airline": "WW",
            //                             "flight_number": "126",
            //                             "aircraft": "321",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "R",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T06:10",
            //                             "arrives_at": "2017-03-29T10:25",
            //                             "origin": {
            //                                 "airport": "KEF"
            //                             },
            //                             "destination": {
            //                                 "airport": "LGW",
            //                                 "terminal": "S"
            //                             },
            //                             "marketing_airline": "WW",
            //                             "operating_airline": "WW",
            //                             "flight_number": "810",
            //                             "aircraft": "320",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "O",
            //                                 "seats_remaining": 5
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "1505.68",
            //             "price_per_adult": {
            //                 "total_fare": "406.42",
            //                 "tax": "104.42"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T14:10",
            //                             "arrives_at": "2017-03-28T16:14",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "A"
            //                             },
            //                             "destination": {
            //                                 "airport": "YYZ",
            //                                 "terminal": "3"
            //                             },
            //                             "marketing_airline": "WS",
            //                             "operating_airline": "WS",
            //                             "flight_number": "3605",
            //                             "aircraft": "DH4",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "G",
            //                                 "seats_remaining": 7
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-28T22:00",
            //                             "arrives_at": "2017-03-29T10:10",
            //                             "origin": {
            //                                 "airport": "YYZ",
            //                                 "terminal": "3"
            //                             },
            //                             "destination": {
            //                                 "airport": "LGW",
            //                                 "terminal": "N"
            //                             },
            //                             "marketing_airline": "WS",
            //                             "operating_airline": "WS",
            //                             "flight_number": "3",
            //                             "aircraft": "76W",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "G",
            //                                 "seats_remaining": 5
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "1531.96",
            //             "price_per_adult": {
            //                 "total_fare": "382.99",
            //                 "tax": "38.99"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T21:05",
            //                             "arrives_at": "2017-03-29T06:00",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "PDL"
            //                             },
            //                             "marketing_airline": "S4",
            //                             "operating_airline": "S4",
            //                             "flight_number": "250",
            //                             "aircraft": "313",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "S",
            //                                 "seats_remaining": 8
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T08:00",
            //                             "arrives_at": "2017-03-29T11:10",
            //                             "origin": {
            //                                 "airport": "PDL"
            //                             },
            //                             "destination": {
            //                                 "airport": "LIS",
            //                                 "terminal": "1"
            //                             },
            //                             "marketing_airline": "S4",
            //                             "operating_airline": "S4",
            //                             "flight_number": "320",
            //                             "aircraft": "313",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "L",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T12:55",
            //                             "arrives_at": "2017-03-29T15:35",
            //                             "origin": {
            //                                 "airport": "LIS",
            //                                 "terminal": "1"
            //                             },
            //                             "destination": {
            //                                 "airport": "LGW",
            //                                 "terminal": "S"
            //                             },
            //                             "marketing_airline": "S4",
            //                             "operating_airline": "TP",
            //                             "flight_number": "8608",
            //                             "aircraft": "320",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "T",
            //                                 "seats_remaining": 6
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "2089.12",
            //             "price_per_adult": {
            //                 "total_fare": "562.78",
            //                 "tax": "68.78"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T23:35",
            //                             "arrives_at": "2017-03-29T16:10",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "IST",
            //                                 "terminal": "I"
            //                             },
            //                             "marketing_airline": "TK",
            //                             "operating_airline": "TK",
            //                             "flight_number": "82",
            //                             "aircraft": "333",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "S",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T18:35",
            //                             "arrives_at": "2017-03-29T20:45",
            //                             "origin": {
            //                                 "airport": "IST",
            //                                 "terminal": "I"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "2"
            //                             },
            //                             "marketing_airline": "TK",
            //                             "operating_airline": "TK",
            //                             "flight_number": "1983",
            //                             "aircraft": "32B",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "S",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "2297.96",
            //             "price_per_adult": {
            //                 "total_fare": "627.49",
            //                 "tax": "203.49"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T21:30",
            //                             "arrives_at": "2017-03-29T06:30",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "KEF"
            //                             },
            //                             "marketing_airline": "FI",
            //                             "operating_airline": "FI",
            //                             "flight_number": "630",
            //                             "aircraft": "76W",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "B",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T07:35",
            //                             "arrives_at": "2017-03-29T11:35",
            //                             "origin": {
            //                                 "airport": "KEF"
            //                             },
            //                             "destination": {
            //                                 "airport": "LGW",
            //                                 "terminal": "N"
            //                             },
            //                             "marketing_airline": "FI",
            //                             "operating_airline": "FI",
            //                             "flight_number": "470",
            //                             "aircraft": "75W",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "B",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "2521.72",
            //             "price_per_adult": {
            //                 "total_fare": "701.43",
            //                 "tax": "134.43"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:15",
            //                             "arrives_at": "2017-03-29T06:15",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "C"
            //                             },
            //                             "destination": {
            //                                 "airport": "SNN"
            //                             },
            //                             "marketing_airline": "EI",
            //                             "operating_airline": "EI",
            //                             "flight_number": "134",
            //                             "aircraft": "757",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "M",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T07:30",
            //                             "arrives_at": "2017-03-29T09:05",
            //                             "origin": {
            //                                 "airport": "SNN"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "2"
            //                             },
            //                             "marketing_airline": "EI",
            //                             "operating_airline": "EI",
            //                             "flight_number": "380",
            //                             "aircraft": "320",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "2994.48",
            //             "price_per_adult": {
            //                 "total_fare": "780.62",
            //                 "tax": "50.62"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T21:55",
            //                             "arrives_at": "2017-03-29T09:15",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "3"
            //                             },
            //                             "marketing_airline": "VS",
            //                             "operating_airline": "VS",
            //                             "flight_number": "12",
            //                             "aircraft": "789",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "L",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T21:55",
            //                             "arrives_at": "2017-03-29T09:15",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "3"
            //                             },
            //                             "marketing_airline": "DL",
            //                             "operating_airline": "VS",
            //                             "flight_number": "4379",
            //                             "aircraft": "789",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:20",
            //                             "arrives_at": "2017-03-29T06:50",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "5"
            //                             },
            //                             "marketing_airline": "BA",
            //                             "operating_airline": "BA",
            //                             "flight_number": "212",
            //                             "aircraft": "744",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 8
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:20",
            //                             "arrives_at": "2017-03-29T06:50",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "5"
            //                             },
            //                             "marketing_airline": "IB",
            //                             "operating_airline": "BA",
            //                             "flight_number": "4639",
            //                             "aircraft": "744",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:20",
            //                             "arrives_at": "2017-03-29T06:50",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "5"
            //                             },
            //                             "marketing_airline": "AY",
            //                             "operating_airline": "BA",
            //                             "flight_number": "5412",
            //                             "aircraft": "744",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 8
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:20",
            //                             "arrives_at": "2017-03-29T06:50",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "5"
            //                             },
            //                             "marketing_airline": "AA",
            //                             "operating_airline": "BA",
            //                             "flight_number": "6163",
            //                             "aircraft": "744",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 7
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": false,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:18",
            //                             "arrives_at": "2017-03-29T07:05",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "A"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "3"
            //                             },
            //                             "marketing_airline": "AF",
            //                             "operating_airline": "DL",
            //                             "flight_number": "3681",
            //                             "aircraft": "76W",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "K",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:18",
            //                             "arrives_at": "2017-03-29T07:05",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "A"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "3"
            //                             },
            //                             "marketing_airline": "KL",
            //                             "operating_airline": "DL",
            //                             "flight_number": "6186",
            //                             "aircraft": "76W",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "K",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T17:30",
            //                             "arrives_at": "2017-03-28T18:45",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "B"
            //                             },
            //                             "destination": {
            //                                 "airport": "YUL"
            //                             },
            //                             "marketing_airline": "UA",
            //                             "operating_airline": "UA",
            //                             "flight_number": "8363",
            //                             "aircraft": "CRJ",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 7
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-28T19:45",
            //                             "arrives_at": "2017-03-29T07:25",
            //                             "origin": {
            //                                 "airport": "YUL"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "2"
            //                             },
            //                             "marketing_airline": "UA",
            //                             "operating_airline": "AC",
            //                             "flight_number": "8296",
            //                             "aircraft": "333",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 7
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T17:30",
            //                             "arrives_at": "2017-03-28T18:45",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "B"
            //                             },
            //                             "destination": {
            //                                 "airport": "YUL"
            //                             },
            //                             "marketing_airline": "AC",
            //                             "operating_airline": "AC",
            //                             "flight_number": "8463",
            //                             "aircraft": "CRJ",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-28T19:45",
            //                             "arrives_at": "2017-03-29T07:25",
            //                             "origin": {
            //                                 "airport": "YUL"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "2"
            //                             },
            //                             "marketing_airline": "AC",
            //                             "operating_airline": "AC",
            //                             "flight_number": "864",
            //                             "aircraft": "333",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5470.40",
            //             "price_per_adult": {
            //                 "total_fare": "1541.10",
            //                 "tax": "153.10"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T19:40",
            //                             "arrives_at": "2017-03-28T21:19",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "B"
            //                             },
            //                             "destination": {
            //                                 "airport": "IAD"
            //                             },
            //                             "marketing_airline": "LH",
            //                             "operating_airline": "UA",
            //                             "flight_number": "7513",
            //                             "aircraft": "738",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 4
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-28T22:00",
            //                             "arrives_at": "2017-03-29T10:30",
            //                             "origin": {
            //                                 "airport": "IAD"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "2"
            //                             },
            //                             "marketing_airline": "LH",
            //                             "operating_airline": "UA",
            //                             "flight_number": "9267",
            //                             "aircraft": "777",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 4
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5558.40",
            //             "price_per_adult": {
            //                 "total_fare": "1563.10",
            //                 "tax": "175.10"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T21:45",
            //                             "arrives_at": "2017-03-29T11:00",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "E"
            //                             },
            //                             "destination": {
            //                                 "airport": "ZRH"
            //                             },
            //                             "marketing_airline": "LX",
            //                             "operating_airline": "LX",
            //                             "flight_number": "53",
            //                             "aircraft": "333",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 9
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T12:05",
            //                             "arrives_at": "2017-03-29T13:00",
            //                             "origin": {
            //                                 "airport": "ZRH"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "2"
            //                             },
            //                             "marketing_airline": "LX",
            //                             "operating_airline": "LX",
            //                             "flight_number": "332",
            //                             "aircraft": "320",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 9
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5604.88",
            //             "price_per_adult": {
            //                 "total_fare": "1574.72",
            //                 "tax": "186.72"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": false
            //             }
            //         }
            //     },
            //     {
            //         "itineraries": [
            //             {
            //                 "outbound": {
            //                     "flights": [
            //                         {
            //                             "departs_at": "2017-03-28T17:30",
            //                             "arrives_at": "2017-03-28T18:45",
            //                             "origin": {
            //                                 "airport": "BOS",
            //                                 "terminal": "B"
            //                             },
            //                             "destination": {
            //                                 "airport": "YUL"
            //                             },
            //                             "marketing_airline": "SN",
            //                             "operating_airline": "SN",
            //                             "flight_number": "9618",
            //                             "aircraft": "CRJ",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 4
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-28T19:45",
            //                             "arrives_at": "2017-03-29T08:35",
            //                             "origin": {
            //                                 "airport": "YUL"
            //                             },
            //                             "destination": {
            //                                 "airport": "BRU"
            //                             },
            //                             "marketing_airline": "SN",
            //                             "operating_airline": "AC",
            //                             "flight_number": "9552",
            //                             "aircraft": "333",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 4
            //                             }
            //                         },
            //                         {
            //                             "departs_at": "2017-03-29T09:55",
            //                             "arrives_at": "2017-03-29T10:15",
            //                             "origin": {
            //                                 "airport": "BRU"
            //                             },
            //                             "destination": {
            //                                 "airport": "LHR",
            //                                 "terminal": "2"
            //                             },
            //                             "marketing_airline": "SN",
            //                             "operating_airline": "SN",
            //                             "flight_number": "2093",
            //                             "aircraft": "320",
            //                             "booking_info": {
            //                                 "travel_class": "ECONOMY",
            //                                 "booking_code": "H",
            //                                 "seats_remaining": 4
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         ],
            //         "fare": {
            //             "total_price": "5617.16",
            //             "price_per_adult": {
            //                 "total_fare": "1577.79",
            //                 "tax": "189.79"
            //             },
            //             "restrictions": {
            //                 "refundable": true,
            //                 "change_penalties": true
            //             }
            //         }
            //     }
            // ]
        };
    }
})();