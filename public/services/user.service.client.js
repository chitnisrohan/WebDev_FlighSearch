(function () {
    angular
        .module("FlightSearchApp")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
            "createUser" : createUser,
            "findUserByUsername" : findUserByUsername,
            "login" : login,
            "findAllUsers" : findAllUsers,
            "findSecurityQuestionByUsername": findSecurityQuestionByUsername
        };
        return api;

        function findAllUsers() {
            return $http.get("/api/allUsers");
        }

        function createUser(newUser) {
            return $http.post("/api/user", newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function findUserByCredentials(username, password, passwordRecoveryAnswer) {
            return $http.get("/api/user?username="+username+"&password="+password+"&passwordRecoveryAnswer="+passwordRecoveryAnswer);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findSecurityQuestionByUsername (username) {
            return $http.get("/api/user/securityquestion?username="+username);
        }
    }
})();