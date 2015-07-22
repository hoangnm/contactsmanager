(function() {

  angular.module('app')
  .directive('pagination', [function() {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: './js/directives/pagination/pagination.html',
      link: function(scope, element, attrs) {
        
      }
    };
  }]);
})();