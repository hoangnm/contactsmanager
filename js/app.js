(function() {
    angular.module('app', ['ui.router', 'file-model'])
    .run(['$rootScope', '$state', function($rootScope, $state) {
      $rootScope.go = function(state, params, options) {
        options = options || {};
        $state.go(state, params, options);
      };
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
        .state('contact-new', {
            url: '/contact-new',
            templateUrl: './js/templates/new.html',
            controller: 'newContactCtrl',
        })
        .state('contact-edit', {
            url: '/contact-edit/:id',
            templateUrl: './js/templates/edit.html',
            controller: 'editContactCtrl',
        });
         $urlRouterProvider.when('/', '/home');
    }]);
})();