(function() {
  angular.module('app')
    .controller('homeCtrl', ['$rootScope','$scope', 'contactDB', 
      function($rootScope, $scope, contactDB) {
      var getDataDone = false;
      
      $scope.customers = [];
      $rootScope.$on('searchBar:filter', function(event, data) {
        console.log(data);
        contactDB.find(data.name, data.key)
        .then(function(res) {
          $scope.customers = res;
          getDataDone = true;
        });
      });
      $scope.onItemClick = function(customer) {
        $scope.go('contact-show', {id: customer._id});
      };
      $scope.isEmpty = function() {
        return getDataDone && $scope.customers.length === 0;
      };
    }]);
})();