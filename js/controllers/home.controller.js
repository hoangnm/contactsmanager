(function() {
  angular.module('app')
    .controller('homeCtrl', ['$scope', 'contactDB', 
      function($scope, contactDB) {
      var getDataDone = false;
      $scope.data = {filterKey: 'name', filterValue: null};
      $scope.customers = [];
      $scope.filter = function(name, key) {
        contactDB.find(name, key)
        .then(function(res) {
          $scope.customers = res;
          getDataDone = true;
        });
      };
      $scope.onItemClick = function(customer) {
        $scope.go('contact/' + customer._id);
      };
      $scope.isEmpty = function() {
        return getDataDone && $scope.customers.length === 0;
      };
    }]);
})();