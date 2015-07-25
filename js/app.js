(function() {
    
    angular.module('app', ['ui.router', 'file-model'])
    .run(['$rootScope', '$state', '$window', function($rootScope, $state, $window) {
      $rootScope.go = function(state, params, options) {
        options = options || {};
        $state.go(state, params, options);
      };
      $rootScope.back = function() {
        $window.history.back();
      };
      $rootScope.$on('searchBar:filter', function(event, data) {
        $rootScope.go('contact-search', {key: data.key, value: data.value});
      });
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './js/templates/home.html',
            controller: 'homeCtrl',
        })
        .state('contact-show', {
            url: '/contact/:id',
            templateUrl: './js/templates/contact.html',
            controller: 'contactCtrl',
        })
        .state('contact-edit', {
            url: '/contact-edit/:id',
            templateUrl: './js/templates/edit.html',
            controller: 'editContactCtrl',
        })
        .state('contact-search', {
            url: '/contact-search/:key/:value',
            templateUrl: './js/templates/contacts.html',
            controller: 'contactsCtrl',
        })
        .state('settings', {
            url: '/settings',
            templateUrl: './js/templates/settings.html',
            controller: 'settingsCtrl'
        });
         $urlRouterProvider.when('/', '/home');
    }]);
})();