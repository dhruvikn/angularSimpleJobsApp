app.controller('authController', function ($rootScope, $scope, $timeout, $location) {
    $scope.auth = function () {
        $scope.err = null;
        $scope.registerSuccess = false;

        if (!$scope.user.email) {
            $scope.err = "Email is required"
            return
        }

        if (!$scope.user.password) {
            $scope.err = "Password is required"
            return
        }

        $scope.isLoading = true;

        if ($rootScope.title.includes("Sign In")) {
            $rootScope.user = JSON.parse(localStorage.getItem($scope.user.email));

            if (!$rootScope.user) {
                $scope.err = "No user found with this email, please register."
                $scope.isLoading = false;
                return
            }

            if ($rootScope.user.password == $scope.user.password) {
                $timeout(() => {
                    $location.path("/dashboard");
                    $scope.isLoading = false;
                }, 2000);
            } else {
                $scope.isLoading = false;
                $scope.err = "The password you've entered is incorrect."
                return
            }
        } else {
            let data = {
                email: $scope.user.email,
                password: $scope.user.password
            }

            localStorage.setItem($scope.user.email, JSON.stringify(data));

            $timeout(() => {
                $scope.togglePage();
                $("#email").focus();
                $scope.registerSuccess = true;
                $scope.isLoading = false;
            }, 2000);
        }
    }

    $scope.togglePage = function () {
        $scope.err = null;
        $scope.user.email = null;
        $scope.user.password = null;

        if ($rootScope.title.includes("Sign In")) {
            $rootScope.title = "Register - Angular Simple Jobs App";
        } else {
            $rootScope.title = "Sign In - Angular Simple Jobs App";
        }
    }

    $scope.init = function () {
        $rootScope.title = "Sign In - Angular Simple Jobs App"
        $scope.user = {};
        $scope.isLoading = false;
    }

    $scope.init();
});