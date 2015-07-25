(function() {
    angular.module('app')
    .controller('headerCtrl', ['$scope', function($scope) {
      $scope.onHeaderDblclick = function() {
        $scope.go('settings');
      };
    }]);
})();