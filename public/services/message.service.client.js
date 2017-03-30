(function () {
    angular
        .module("FlightSearchApp")
        .factory("MessageService", MessageService);

    function MessageService($http) {

        var api = {
            "findAlertsForUser" : findAlertsForUser,
            "deleteAlert" : deleteAlert,
            "findAlerts" : findAlerts,
            "sendMessage" : sendMessage,
            "deleteMessageForAgent" : deleteMessageForAgent,
            "getAllNotification" : getAllNotification,
            "findHistory" : findHistory,
            "deleteMessageFromHistory" : deleteMessageFromHistory
        };
        return api;

        function deleteMessageFromHistory(messageId, agentId) {
            return $http.delete("/api/deleteFromAgentHistory/" + messageId +"/"+ agentId);
        }

        function findHistory(agentId) {
            return $http.get("/api/getAgentHistory/" + agentId);
        }

        function getAllNotification(userId) {
            return $http.get("/api/getAllNotifications/" + userId);
        }

        function deleteMessageForAgent(alert, agentId) {
            return $http.put("/api/deleteMessage/" + agentId, alert);
        }

        function sendMessage(alert) {
            return $http.put("/api/sendMessage", alert);
        }

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