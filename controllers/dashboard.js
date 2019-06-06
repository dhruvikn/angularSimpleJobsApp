app.controller('dashboardController', function ($rootScope, $scope, $timeout, $location, jobsService) {
    $scope.isLoading = true;

    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

    $scope.getJobs = function () {
        let data = {
            page: 1
        }

        let getJobsPromise = jobsService.getJobs(data);
        getJobsPromise.then(data => {
            $scope.isLoading = false;
            $scope.jobs = chunk(data, 2);
            console.log(data)
        }, err => {
            $scope.isLoading = false;
            console.log(err)
        })
    }

    $scope.loadJob = function (job) {
        $scope.jobToShow = angular.copy(job);
        $scope.jobToShow.created_at = new Date($scope.jobToShow.created_at);

        $("#description").html($scope.jobToShow.description);
        $("#how_to_apply").html($scope.jobToShow.description);
    }

    $scope.logout = function() {
        $location.path("/");
    }

    $scope.init = function () {
        $rootScope.title = "Dashboard - Angular Simple Jobs App";
        $scope.getJobs();
    }

    $scope.init();
});