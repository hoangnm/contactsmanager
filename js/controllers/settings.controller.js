(function() {
  angular.module('app')
  .controller('settingsCtrl', ['$scope', 'utils', function($scope, utils) {
    $scope.data = {dbPath: utils.getDBPath()};
    $scope.onSubmit = function(form) {
      if(form.$valid) {
        utils.setDBPath($scope.data.dbPath);
      }
    };
  }]);
})();