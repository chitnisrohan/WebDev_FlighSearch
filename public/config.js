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
            .when("/register" , {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid" , {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/agentNotification" , {
                templateUrl: "views/user/templates/agent.notification.view.client.html",
                controller: "AgentNotificationController",
                controllerAs: "model"
            })
            .when("/userHistory" , {
                templateUrl: "views/user/templates/user.history.view.client.html",
                controller: "UserHistoryController",
                controllerAs: "model"
            })
            .when("/agentHistory" , {
                templateUrl: "views/user/templates/agent.history.view.client.html",
                controller: "AgentHistoryController",
                controllerAs: "model"
            })
            .when("/userNotification" , {
                templateUrl: "views/user/templates/user.notification.view.client.html",
                controller: "UserNotificationController",
                controllerAs: "model"
            });
    }
})();