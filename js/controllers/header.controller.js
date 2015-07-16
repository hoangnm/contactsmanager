(function() {
    angular.module('app')
    .controller('headerCtrl', ['$scope', 'excelService', function($scope, excelService) {
      $scope.importExcel = function () {
        excelService.init();
      };
    }]);
})();