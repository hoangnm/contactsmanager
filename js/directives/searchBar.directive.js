(function() {

  angular.module('app')
  .directive('searchBar', [function() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: './js/directives/searchBar.html',
      link: function(scope, element, attrs) {
        scope.data = {filterKey: 'name', filterValue: null};
        scope.filter = function(filterValue, filterKey) {
          scope.$emit('searchBar:filter', {key: filterKey, value:filterValue});
        };
      }
    };
  }]);
})();