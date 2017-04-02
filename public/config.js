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
            .when("/user/58dee67efb263b7c7dd7b2c8/adminProfile", {
                templateUrl: "views/user/templates/admin-profile.view.client.html",
                controller: "AdminProfileController",
                controllerAs: "model"
            })
            .when("/user/58dee67efb263b7c7dd7b2c8/allHotels",{
                templateUrl: "views/user/templates/admin-hotels.view.client.html",
                controller: "AdminHotelsController",
                controllerAs: "model"
            })
            .when("/user/58dee67efb263b7c7dd7b2c8/allMessages",{
                templateUrl: "views/user/templates/admin-messages.view.client.html",
                controller: "AdminMessagesController",
                controllerAs: "model"
            })
            .when("/hotels/SearchResults/location/:loc/checkin/:cin/checkout/:cout" , {
                templateUrl: "views/hotels/templates/hotel-search.results.view.client.html",
                controller: "HotelSearchResultsController",
                controllerAs: "model"
            })
            .when("/user/:uid/flightSearch", {
                templateUrl: "views/flights/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/flight/search/SRC/:src/DEST/:dest/DEPART/:dept/RETURN/:ret/ADULTS/:adults/CHILD/:child/CLASS/:class", {
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
            .when("/user/:uid" , {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user-hotelowner/:uid" , {
                templateUrl: "views/user/templates/hotel-owner.profile.view.client.html",
                controller: "HotelOwnerProfileController",
                controllerAs: "model"
            })

            .when("/user-hotelowner/:uid/hotel" , {
                templateUrl: "views/user/templates/hotel-owner.hotelslist.view.client.html",
                controller: "HotelOwnerListController",
                controllerAs: "model"
            })
            .when("/user-hotelowner/:uid/hotel/new" , {
                templateUrl: "views/user/templates/hotel-owner.newhotel.view.client.html",
                controller: "NewHotelController",
                controllerAs: "model"
            })
            .when("/user/:uid/agentNotification" , {
                templateUrl: "views/user/templates/agent.notification.view.client.html",
                controller: "AgentNotificationController",
                controllerAs: "model"
            })
            .when("/user/:uid/userHistory" , {
                templateUrl: "views/user/templates/user.history.view.client.html",
                controller: "UserHistoryController",
                controllerAs: "model"
            })
            .when("/user/:uid/agentHistory" , {
                templateUrl: "views/user/templates/agent.history.view.client.html",
                controller: "AgentHistoryController",
                controllerAs: "model"
            })
            .when("/user/:uid/userNotification" , {
                templateUrl: "views/user/templates/user.notification.view.client.html",
                controller: "UserNotificationController",
                controllerAs: "model"
            });
    }
})();