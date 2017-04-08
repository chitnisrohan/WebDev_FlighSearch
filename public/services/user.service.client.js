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
            "findSecurityQuestionByUsername": findSecurityQuestionByUsername,
            "checkLogin" : checkLogin,
            "logout" : logout,
            "findCurrentUser" : findCurrentUser
        };
        return api;

        function findCurrentUser() {
            return $http.get("/api/findCurrentUser");
        }
        
        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function findAllUsers() {
            return $http.get("/api/allUsers");
        }

        function createUser(newUser) {
            console.log(newUser);
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