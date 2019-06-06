'use strict';

angular.module('simpleApp').service('jobsService', ['$resource', '$http', '$q',
    function ($resource, $http, $q) {
        return {
            getJobs: function (data) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=' + data.page,
                    cache: false
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (msg) {
                    deferred.reject(msg);
                });
                return deferred.promise;
            },
        }
    }
])