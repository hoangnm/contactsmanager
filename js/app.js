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
        .when('/contact/:id', {
            templateUrl: './js/templates/contact.html',
            controller: 'contactCtrl',
        })
        .when('/contact-new', {
            templateUrl: './js/templates/new.html',
            controller: 'newContactCtrl',
        })
        .when('/contact-edit/:id', {
            templateUrl: './js/templates/edit.html',
            controller: 'editContactCtrl',
        });
    }]);
})();