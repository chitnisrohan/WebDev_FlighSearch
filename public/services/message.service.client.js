(function () {
    angular
        .module("FlightSearchApp")
        .factory("MessageService", MessageService);

    function MessageService($http) {

        var api = {
            "findAlertsForUser" : findAlertsForUser,
            "deleteAlert" : deleteAlert
        };
        return api;

        function deleteAlert(alertId) {
            return $http.delete("/api/alerts/" + alertId);
        }

        function findAlertsForUser(userId) {
            return $http.get("/api/alerts/" + userId);
        }

    }
})();