(function() {
    angular.module('app', ['ngRoute'])
    .run(['$rootScope', '$location', function($rootScope, $location) {
      $rootScope.go = function(url) {
        $location.url(url);
      };
    }])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './js/templates/home.html',
            controller: 'homeCtrl',
        })
        .when('/customer/:id', {
            templateUrl: './js/templates/customer.html',
            controller: 'customerCtrl',
        })
        .when('/customer-new', {
            templateUrl: './js/templates/new.html',
            controller: 'newCustomerCtrl',
        });
    }]);
})();