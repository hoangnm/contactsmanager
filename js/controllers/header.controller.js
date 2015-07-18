(function() {
    angular.module('app')
    .controller('headerCtrl', ['$scope', 'excelService', function($scope, excelService) {
      var file = null;
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
    }]);
})();