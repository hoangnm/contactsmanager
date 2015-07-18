(function() {
  angular.module('app')
    .controller('homeCtrl', ['$rootScope','$scope', 'contactDB', 'excelService',
      function($rootScope, $scope, contactDB, excelService) {
      var file = null;
      $scope.data = {};
      $scope.canImport = false;
      $scope.$on('file:upload', function(event, fileData) {
        file = fileData;
        if(file) $scope.canImport = true;
      });
      $scope.importExcel = function () {
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