(function() {
  angular.module('app')
  .directive('fileUpload', [function() {
    return {
      restrict: 'EA',
      scope: {
        onImport: '&'
      },
      template: '<div class="file-upload">' + 
                  '<input type="file">' +
                  '<a>{{fileName}}</a>' +
                '</div>' + 
                '<button ng-click="importExcel()" ng-disabled="!canImport">Import</button>',
      link: function(scope, element, attrs) {
        var uploadElem = element.find('input');
        var file;
        scope.fileName = 'Upload file excel';
        scope.canImport = false;
        scope.importExcel = function () {
          scope.onImport()(file);
          reset();
        };
        element.find('a').on('click', function() {
          uploadElem[0].click();
        });
        uploadElem.on('change', function() {
          scope.$apply(function() {
            file = uploadElem[0].files[0];
            scope.fileName = uploadElem[0].files[0].name;
            scope.canImport = true;
          });
        });
        function reset() {
          scope.canImport = false;
          file = null;
          scope.fileName = 'Upload file excel';
        }
      }
    };
  }]);
})();