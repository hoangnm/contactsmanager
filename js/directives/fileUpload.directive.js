(function() {
  angular.module('app')
  .directive('fileUpload', [function() {
    return {
      restrict: 'EA',
      scope: true,
      template: '<div class="file-upload">' + 
                  '<input type="file">' +
                  '<a>{{fileName}}</a>' +
                '</div>',
      link: function(scope, element, attrs) {
        var uploadElem = element.find('input');
        scope.fileName = 'Upload file excel';
        element.find('a').on('click', function() {
          uploadElem[0].click();
        });
        uploadElem.on('change', function() {
          scope.$emit('file:upload', uploadElem[0].files[0]);
          scope.$apply(function() {
            scope.fileName = uploadElem[0].files[0].name;
          });
        });
      }
    };
  }]);
})();