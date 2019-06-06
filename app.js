var app = angular.module('simpleApp', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/", {
            templateUrl: "./views/auth.html"
        })
        .when("/dashboard", {
            templateUrl: "./views/dashboard.html"
        });
});