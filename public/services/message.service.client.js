(function () {
    angular
        .module("FlightSearchApp")
        .factory("MessageService", MessageService);

    function MessageService($http) {

        var api = {
            "findAlertsForUser" : findAlertsForUser,
            "deleteAlert" : deleteAlert,
            "findAlerts" : findAlerts
        };
        return api;

        function findAlerts() {
            return $http.get("/api/allAlerts");
        }

        function deleteAlert(alertId) {
            return $http.delete("/api/alerts/" + alertId);
        }

        function findAlertsForUser(userId) {
            return $http.get("/api/alerts/" + userId);
        }

    }
})();