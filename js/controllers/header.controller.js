(function() {
    angular.module('app')
    .controller('headerCtrl', ['$scope', 'excelService', function($scope, excelService) {
      $scope.importExcel = function (file) {
        if(file) {
          var path = file.path;
          excelService.importToDB(path)
          .then(function(res) {
            alert('done');
          });
        }
      };
    }]);
})();