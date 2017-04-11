(function(){
    angular
        .module("FlightSearchApp")
        .config(configuration);

    function configuration($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/", {
                templateUrl: "views/flights/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/hotelSearch", {
                templateUrl: "views/hotels/templates/hotel-search.view.client.html",
                controller: "HotelSearchController",
                controllerAs: "model"
            })
            .when("/user/hotelSearch", {
                templateUrl: "views/hotels/templates/hotel-search.view.client.html",
                controller: "HotelSearchController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user/allUsers", {
                templateUrl: "views/user/templates/admin-users.view.client.html",
                controller: "AdminProfileController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user/allHotels",{
                templateUrl: "views/user/templates/admin-hotels.view.client.html",
                controller: "AdminHotelsController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user/allMessages",{
                templateUrl: "views/user/templates/admin-messages.view.client.html",
                controller: "AdminMessagesController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/hotels/SearchResults/location/:loc/checkin/:cin/checkout/:cout" , {
                templateUrl: "views/hotels/templates/hotel-search.results.view.client.html",
                controller: "HotelSearchResultsController",
                controllerAs: "model"
            })
            .when("/user/flightSearch", {
                templateUrl: "views/flights/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/flight/search/SRC/:src/DEST/:dest/DEPART/:dept/RETURN/:ret/ADULTS/:adults/CHILD/:child/CLASS/:class", {
                templateUrl: "views/flights/templates/search.results.view.client.html",
                controller: "SearchResultController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register/:userType" , {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/profile" , {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user-hotelowner/profile" , {
                templateUrl: "views/user/templates/hotel-owner.profile.view.client.html",
                controller: "HotelOwnerProfileController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user-hotelowner/hotel" , {
                templateUrl: "views/user/templates/hotel-owner.hotelslist.view.client.html",
                controller: "HotelOwnerListController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user-hotelowner/hotel/new" , {
                templateUrl: "views/user/templates/hotel-owner.newhotel.view.client.html",
                controller: "NewHotelController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user-hotelowner/hotel/:hid" , {
                templateUrl: "views/user/templates/hotel-owner.edithotel.view.client.html",
                controller: "EditHotelController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user/agentNotification" , {
                templateUrl: "views/user/templates/agent.notification.view.client.html",
                controller: "AgentNotificationController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user/userHistory" , {
                templateUrl: "views/user/templates/user.history.view.client.html",
                controller: "UserHistoryController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user/agentHistory" , {
                templateUrl: "views/user/templates/agent.history.view.client.html",
                controller: "AgentHistoryController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            })
            .when("/user/userNotification" , {
                templateUrl: "views/user/templates/user.notification.view.client.html",
                controller: "UserNotificationController",
                controllerAs: "model",
                resolve : {
                    checkLogin : checkLogin
                }
            });

        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }
    }
})();