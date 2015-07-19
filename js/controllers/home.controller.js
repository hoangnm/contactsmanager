(function() {
  angular.module('app')
    .controller('homeCtrl', ['$rootScope','$scope', 'contactDB', 'excelService',
      function($rootScope, $scope, contactDB, excelService) {
      $scope.data = {};
      $scope.importExcel = function (file) {
        if(file) {
          var path = file.path;
          excelService.importToDB(path);
        }
      };
      
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