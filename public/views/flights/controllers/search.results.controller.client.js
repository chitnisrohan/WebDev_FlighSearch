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

        function displayDetails(index) {
            vm.selectedIndex[index].showDetails = true;
        }

        vm.flightSearchResults = {
            "currency" : "USD",
            "results" : [ {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:15",
                            "arrives_at" : "2017-08-26T06:15",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "C"
                            },
                            "destination" : {
                                "airport" : "SNN"
                            },
                            "marketing_airline" : "BA",
                            "operating_airline" : "BA",
                            "flight_number" : "6134",
                            "aircraft" : "757",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "Q",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-26T07:30",
                            "arrives_at" : "2017-08-26T09:05",
                            "origin" : {
                                "airport" : "SNN"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "BA",
                            "operating_airline" : "EI",
                            "flight_number" : "5940",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "Q",
                                "seats_remaining" : 9
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T09:40",
                            "arrives_at" : "2017-08-29T12:25",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "5"
                            },
                            "destination" : {
                                "airport" : "JFK",
                                "terminal" : "7"
                            },
                            "marketing_airline" : "AA",
                            "operating_airline" : "BA",
                            "flight_number" : "6140",
                            "aircraft" : "744",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "O",
                                "seats_remaining" : 7
                            }
                        }, {
                            "departs_at" : "2017-08-29T15:30",
                            "arrives_at" : "2017-08-29T16:55",
                            "origin" : {
                                "airport" : "JFK",
                                "terminal" : "8"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "marketing_airline" : "AA",
                            "operating_airline" : "AA",
                            "flight_number" : "199",
                            "aircraft" : "32B",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "O",
                                "seats_remaining" : 7
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "2515.84",
                    "price_per_adult" : {
                        "total_fare" : "675.73",
                        "tax" : "468.73"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:15",
                            "arrives_at" : "2017-08-26T06:15",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "C"
                            },
                            "destination" : {
                                "airport" : "SNN"
                            },
                            "marketing_airline" : "BA",
                            "operating_airline" : "BA",
                            "flight_number" : "6134",
                            "aircraft" : "757",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "Q",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-26T07:30",
                            "arrives_at" : "2017-08-26T09:05",
                            "origin" : {
                                "airport" : "SNN"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "BA",
                            "operating_airline" : "EI",
                            "flight_number" : "5940",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "Q",
                                "seats_remaining" : 9
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T08:50",
                            "arrives_at" : "2017-08-29T10:10",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "DUB",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "BA",
                            "operating_airline" : "EI",
                            "flight_number" : "5953",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "Q",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-29T11:30",
                            "arrives_at" : "2017-08-29T13:30",
                            "origin" : {
                                "airport" : "DUB",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "C"
                            },
                            "marketing_airline" : "BA",
                            "operating_airline" : "EI",
                            "flight_number" : "6137",
                            "aircraft" : "330",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "Q",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "2632.08",
                    "price_per_adult" : {
                        "total_fare" : "704.79",
                        "tax" : "448.79"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:21",
                            "arrives_at" : "2017-08-26T07:05",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "A"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "marketing_airline" : "DL",
                            "operating_airline" : "DL",
                            "flight_number" : "58",
                            "aircraft" : "76W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "E",
                                "seats_remaining" : 9
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T09:40",
                            "arrives_at" : "2017-08-29T12:15",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "DL",
                            "operating_airline" : "DL",
                            "flight_number" : "59",
                            "aircraft" : "76W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "E",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "2876.20",
                    "price_per_adult" : {
                        "total_fare" : "809.82",
                        "tax" : "457.82"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:21",
                            "arrives_at" : "2017-08-26T07:05",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "A"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "marketing_airline" : "AF",
                            "operating_airline" : "DL",
                            "flight_number" : "3567",
                            "aircraft" : "76W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "N",
                                "seats_remaining" : 8
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T09:40",
                            "arrives_at" : "2017-08-29T12:15",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "AF",
                            "operating_airline" : "DL",
                            "flight_number" : "3610",
                            "aircraft" : "76W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "V",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "2876.20",
                    "price_per_adult" : {
                        "total_fare" : "809.82",
                        "tax" : "457.82"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:21",
                            "arrives_at" : "2017-08-26T07:05",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "A"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "marketing_airline" : "KL",
                            "operating_airline" : "DL",
                            "flight_number" : "6186",
                            "aircraft" : "76W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "N",
                                "seats_remaining" : 8
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T09:40",
                            "arrives_at" : "2017-08-29T12:15",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "KL",
                            "operating_airline" : "DL",
                            "flight_number" : "6187",
                            "aircraft" : "76W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "V",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "2876.20",
                    "price_per_adult" : {
                        "total_fare" : "809.82",
                        "tax" : "457.82"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T18:20",
                            "arrives_at" : "2017-08-26T05:50",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "C"
                            },
                            "destination" : {
                                "airport" : "LIS",
                                "terminal" : "1"
                            },
                            "marketing_airline" : "TP",
                            "operating_airline" : "TP",
                            "flight_number" : "218",
                            "aircraft" : "332",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-26T07:05",
                            "arrives_at" : "2017-08-26T09:45",
                            "origin" : {
                                "airport" : "LIS",
                                "terminal" : "1"
                            },
                            "destination" : {
                                "airport" : "LGW",
                                "terminal" : "S"
                            },
                            "marketing_airline" : "TP",
                            "operating_airline" : "TP",
                            "flight_number" : "336",
                            "aircraft" : "319",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 9
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T06:00",
                            "arrives_at" : "2017-08-29T08:35",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "LIS",
                                "terminal" : "1"
                            },
                            "marketing_airline" : "TP",
                            "operating_airline" : "TP",
                            "flight_number" : "361",
                            "aircraft" : "319",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "T",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-29T10:45",
                            "arrives_at" : "2017-08-29T13:20",
                            "origin" : {
                                "airport" : "LIS",
                                "terminal" : "1"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "TP",
                            "operating_airline" : "TP",
                            "flight_number" : "217",
                            "aircraft" : "332",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "T",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "2905.48",
                    "price_per_adult" : {
                        "total_fare" : "773.14",
                        "tax" : "480.14"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:21",
                            "arrives_at" : "2017-08-26T07:05",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "A"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "marketing_airline" : "VS",
                            "operating_airline" : "DL",
                            "flight_number" : "4012",
                            "aircraft" : "76W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "X",
                                "seats_remaining" : 8
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T17:25",
                            "arrives_at" : "2017-08-29T19:35",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "3"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "VS",
                            "operating_airline" : "VS",
                            "flight_number" : "11",
                            "aircraft" : "789",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "O",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "3128.20",
                    "price_per_adult" : {
                        "total_fare" : "881.82",
                        "tax" : "457.82"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T14:16",
                            "arrives_at" : "2017-08-25T16:04",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "destination" : {
                                "airport" : "IAD"
                            },
                            "marketing_airline" : "SN",
                            "operating_airline" : "UA",
                            "flight_number" : "8899",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "L",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-25T17:50",
                            "arrives_at" : "2017-08-26T07:30",
                            "origin" : {
                                "airport" : "IAD"
                            },
                            "destination" : {
                                "airport" : "BRU"
                            },
                            "marketing_airline" : "SN",
                            "operating_airline" : "SN",
                            "flight_number" : "516",
                            "aircraft" : "332",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "L",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-26T09:55",
                            "arrives_at" : "2017-08-26T10:15",
                            "origin" : {
                                "airport" : "BRU"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "SN",
                            "operating_airline" : "SN",
                            "flight_number" : "2093",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "L",
                                "seats_remaining" : 4
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T11:05",
                            "arrives_at" : "2017-08-29T13:10",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "BRU"
                            },
                            "marketing_airline" : "SN",
                            "operating_airline" : "SN",
                            "flight_number" : "2094",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-29T15:05",
                            "arrives_at" : "2017-08-29T16:05",
                            "origin" : {
                                "airport" : "BRU"
                            },
                            "destination" : {
                                "airport" : "FRA",
                                "terminal" : "1"
                            },
                            "marketing_airline" : "SN",
                            "operating_airline" : "LH",
                            "flight_number" : "7005",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-29T18:10",
                            "arrives_at" : "2017-08-29T20:30",
                            "origin" : {
                                "airport" : "FRA",
                                "terminal" : "1"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "SN",
                            "operating_airline" : "LH",
                            "flight_number" : "7236",
                            "aircraft" : "333",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 4
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "3404.00",
                    "price_per_adult" : {
                        "total_fare" : "907.77",
                        "tax" : "530.77"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T18:00",
                            "arrives_at" : "2017-08-25T19:15",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "destination" : {
                                "airport" : "YUL"
                            },
                            "marketing_airline" : "UA",
                            "operating_airline" : "UA",
                            "flight_number" : "8425",
                            "aircraft" : "CRJ",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 7
                            }
                        }, {
                            "departs_at" : "2017-08-25T20:00",
                            "arrives_at" : "2017-08-26T07:25",
                            "origin" : {
                                "airport" : "YUL"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "UA",
                            "operating_airline" : "AC",
                            "flight_number" : "8296",
                            "aircraft" : "77W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 7
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T11:05",
                            "arrives_at" : "2017-08-29T13:45",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "YHZ"
                            },
                            "marketing_airline" : "UA",
                            "operating_airline" : "AC",
                            "flight_number" : "8299",
                            "aircraft" : "763",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 7
                            }
                        }, {
                            "departs_at" : "2017-08-29T16:55",
                            "arrives_at" : "2017-08-29T17:24",
                            "origin" : {
                                "airport" : "YHZ"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "marketing_airline" : "UA",
                            "operating_airline" : "UA",
                            "flight_number" : "8120",
                            "aircraft" : "CRJ",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 7
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "3796.20",
                    "price_per_adult" : {
                        "total_fare" : "1072.82",
                        "tax" : "457.82"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T17:00",
                            "arrives_at" : "2017-08-26T06:15",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "destination" : {
                                "airport" : "ZRH"
                            },
                            "marketing_airline" : "LX",
                            "operating_airline" : "LX",
                            "flight_number" : "55",
                            "aircraft" : "333",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-26T07:05",
                            "arrives_at" : "2017-08-26T07:55",
                            "origin" : {
                                "airport" : "ZRH"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "LX",
                            "operating_airline" : "LX",
                            "flight_number" : "316",
                            "aircraft" : "32B",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 9
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T08:40",
                            "arrives_at" : "2017-08-29T11:35",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "ZRH"
                            },
                            "marketing_airline" : "LX",
                            "operating_airline" : "LX",
                            "flight_number" : "317",
                            "aircraft" : "32A",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-29T13:00",
                            "arrives_at" : "2017-08-29T15:20",
                            "origin" : {
                                "airport" : "ZRH"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "LX",
                            "operating_airline" : "LX",
                            "flight_number" : "54",
                            "aircraft" : "333",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 4
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "3911.52",
                    "price_per_adult" : {
                        "total_fare" : "1101.65",
                        "tax" : "486.65"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T14:16",
                            "arrives_at" : "2017-08-25T16:04",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "destination" : {
                                "airport" : "IAD"
                            },
                            "marketing_airline" : "LH",
                            "operating_airline" : "UA",
                            "flight_number" : "7449",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-25T18:15",
                            "arrives_at" : "2017-08-26T06:45",
                            "origin" : {
                                "airport" : "IAD"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "LH",
                            "operating_airline" : "UA",
                            "flight_number" : "9259",
                            "aircraft" : "777",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 4
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T09:30",
                            "arrives_at" : "2017-08-29T12:05",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "FRA",
                                "terminal" : "1"
                            },
                            "marketing_airline" : "LH",
                            "operating_airline" : "LH",
                            "flight_number" : "901",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-29T13:05",
                            "arrives_at" : "2017-08-29T15:05",
                            "origin" : {
                                "airport" : "FRA",
                                "terminal" : "1"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "LH",
                            "operating_airline" : "LH",
                            "flight_number" : "422",
                            "aircraft" : "74H",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "K",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "3934.24",
                    "price_per_adult" : {
                        "total_fare" : "1107.33",
                        "tax" : "492.33"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:50",
                            "arrives_at" : "2017-08-25T22:15",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "destination" : {
                                "airport" : "YHZ"
                            },
                            "marketing_airline" : "AC",
                            "operating_airline" : "AC",
                            "flight_number" : "8896",
                            "aircraft" : "CRJ",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "L",
                                "seats_remaining" : 6
                            }
                        }, {
                            "departs_at" : "2017-08-25T23:45",
                            "arrives_at" : "2017-08-26T09:35",
                            "origin" : {
                                "airport" : "YHZ"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "AC",
                            "operating_airline" : "AC",
                            "flight_number" : "860",
                            "aircraft" : "763",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "L",
                                "seats_remaining" : 6
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T14:10",
                            "arrives_at" : "2017-08-29T16:10",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "YUL"
                            },
                            "marketing_airline" : "AC",
                            "operating_airline" : "AC",
                            "flight_number" : "865",
                            "aircraft" : "77W",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "S",
                                "seats_remaining" : 9
                            }
                        }, {
                            "departs_at" : "2017-08-29T18:00",
                            "arrives_at" : "2017-08-29T19:16",
                            "origin" : {
                                "airport" : "YUL"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "marketing_airline" : "AC",
                            "operating_airline" : "AC",
                            "flight_number" : "8462",
                            "aircraft" : "CRJ",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "S",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "4228.20",
                    "price_per_adult" : {
                        "total_fare" : "1153.82",
                        "tax" : "457.82"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T22:45",
                            "arrives_at" : "2017-08-26T12:45",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "destination" : {
                                "airport" : "FCO",
                                "terminal" : "3"
                            },
                            "marketing_airline" : "AZ",
                            "operating_airline" : "AZ",
                            "flight_number" : "615",
                            "aircraft" : "330",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "S",
                                "seats_remaining" : 7
                            }
                        }, {
                            "departs_at" : "2017-08-26T14:15",
                            "arrives_at" : "2017-08-26T16:05",
                            "origin" : {
                                "airport" : "FCO",
                                "terminal" : "1"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "4"
                            },
                            "marketing_airline" : "AZ",
                            "operating_airline" : "AZ",
                            "flight_number" : "204",
                            "aircraft" : "321",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "S",
                                "seats_remaining" : 7
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T10:55",
                            "arrives_at" : "2017-08-29T14:25",
                            "origin" : {
                                "airport" : "LCY"
                            },
                            "destination" : {
                                "airport" : "FCO",
                                "terminal" : "3"
                            },
                            "marketing_airline" : "AZ",
                            "operating_airline" : "CT",
                            "flight_number" : "211",
                            "aircraft" : "E90",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "L",
                                "seats_remaining" : 7
                            }
                        }, {
                            "departs_at" : "2017-08-29T15:20",
                            "arrives_at" : "2017-08-29T18:40",
                            "origin" : {
                                "airport" : "FCO",
                                "terminal" : "3"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "AZ",
                            "operating_airline" : "AZ",
                            "flight_number" : "614",
                            "aircraft" : "330",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "L",
                                "seats_remaining" : 7
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "4433.86",
                    "price_per_adult" : {
                        "total_fare" : "1249.60",
                        "tax" : "499.60"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T14:16",
                            "arrives_at" : "2017-08-25T16:04",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "destination" : {
                                "airport" : "IAD"
                            },
                            "marketing_airline" : "OS",
                            "operating_airline" : "UA",
                            "flight_number" : "7888",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-25T18:15",
                            "arrives_at" : "2017-08-26T06:45",
                            "origin" : {
                                "airport" : "IAD"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "marketing_airline" : "OS",
                            "operating_airline" : "UA",
                            "flight_number" : "7806",
                            "aircraft" : "777",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 4
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T12:00",
                            "arrives_at" : "2017-08-29T15:10",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "2"
                            },
                            "destination" : {
                                "airport" : "IAD"
                            },
                            "marketing_airline" : "OS",
                            "operating_airline" : "UA",
                            "flight_number" : "7805",
                            "aircraft" : "777",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 4
                            }
                        }, {
                            "departs_at" : "2017-08-29T17:05",
                            "arrives_at" : "2017-08-29T18:39",
                            "origin" : {
                                "airport" : "IAD"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "B"
                            },
                            "marketing_airline" : "OS",
                            "operating_airline" : "UA",
                            "flight_number" : "7887",
                            "aircraft" : "320",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "W",
                                "seats_remaining" : 4
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "5174.60",
                    "price_per_adult" : {
                        "total_fare" : "1461.92",
                        "tax" : "489.92"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            }, {
                "itineraries" : [ {
                    "outbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-25T19:20",
                            "arrives_at" : "2017-08-26T06:50",
                            "origin" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "destination" : {
                                "airport" : "LHR",
                                "terminal" : "5"
                            },
                            "marketing_airline" : "AY",
                            "operating_airline" : "BA",
                            "flight_number" : "5412",
                            "aircraft" : "388",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "E",
                                "seats_remaining" : 8
                            }
                        } ]
                    },
                    "inbound" : {
                        "flights" : [ {
                            "departs_at" : "2017-08-29T19:55",
                            "arrives_at" : "2017-08-29T22:15",
                            "origin" : {
                                "airport" : "LHR",
                                "terminal" : "5"
                            },
                            "destination" : {
                                "airport" : "BOS",
                                "terminal" : "E"
                            },
                            "marketing_airline" : "AY",
                            "operating_airline" : "BA",
                            "flight_number" : "5439",
                            "aircraft" : "777",
                            "booking_info" : {
                                "travel_class" : "ECONOMY",
                                "booking_code" : "Q",
                                "seats_remaining" : 9
                            }
                        } ]
                    }
                } ],
                "fare" : {
                    "total_price" : "5356.20",
                    "price_per_adult" : {
                        "total_fare" : "1499.82",
                        "tax" : "457.82"
                    },
                    "restrictions" : {
                        "refundable" : false,
                        "change_penalties" : true
                    }
                }
            } ]
        };

        function init() {
            var journey = {source: source, destination : destination
                , noOfAdults : noOfAdults, noOfChildren : noOfChildren,
                departDate : departDate, returnDate : returnDate
                , cabinClass : cabinClass};
            vm.userJourney = journey;
            // FlightService
            //     .getFlights(journey)
            //     .success(function (flights) {
            //         vm.flightSearchResults = flights;
            //         console.log(vm.flightSearchResults);
            //     })
            //     .error(function (err) {
            //         vm.err = err;
            //     });
        }
        init();

    }
})();