(function() {
  angular.module('app')
    .controller('homeCtrl', ['$scope', 'customerDB', function($scope, customerDB) {
      var getDataDone = false;
      $scope.data = {filterKey: 'name', filterValue: null};
      $scope.customers = [];
      $scope.filter = function(name, key) {
        customerDB.find(name, key)
        .then(function(res) {
          $scope.customers = res;
          getDataDone = true;
        });
      };
      $scope.onItemClick = function(customer) {
        $scope.go('customer/' + customer._id);
      };
      $scope.isEmpty = function() {
        return getDataDone && $scope.customers.length === 0;
      };
    }]);
})();