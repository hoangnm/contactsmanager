(function() {
  angular.module('app')
    .controller('homeCtrl', ['$rootScope','$scope', 'contactDB', 
      function($rootScope, $scope, contactDB) {
      //var getDataDone = false;
      
      /*$scope.customers = [];
      $rootScope.$on('searchBar:filter', function(event, data) {
        contactDB.find(data.name, data.key)
        .then(function(res) {
          $scope.customers = res;
          getDataDone = true;
        });
      });*/
      /*$scope.onItemClick = function(customer) {
        $scope.go('contact-show', {id: customer._id});
      };
      $scope.isEmpty = function() {
        return getDataDone && $scope.customers.length === 0;
      };*/

      $scope.data = {};
      $scope.onSubmit = function(form) {
        if(form.$valid) {
          contactDB.save($scope.data)
          .then(function() {
            alert('Lưu thành công!');
            $scope.data = {};
          }, function(err) {
            alert(err);
          });
        }
        };
    }]);
})();