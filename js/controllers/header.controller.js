(function() {
    angular.module('app')
    .controller('headerCtrl', ['$scope', 'excelService', function($scope, excelService) {
      $scope.data = {};
      $scope.importExcel = function () {
        var path = $scope.data.fileModel.path;
        excelService.importToDB(path);
        $scope.$broadcast('file:reset');
      };
    }]);
})();