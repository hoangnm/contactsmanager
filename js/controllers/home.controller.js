(function() {
  angular.module('app')
    .controller('homeCtrl', ['$rootScope','$scope', 'contactDB', 'excelService',
      function($rootScope, $scope, contactDB, excelService) {
      //$scope.data = {};
      $scope.forms = [{}];
      $scope.importExcel = function (file) {
        if(file) {
          var path = file.path;
          excelService.importToDB(path);
        }
      };
      
      function onSaveContactSuccess(contact) {
        
      }
      function onSaveContactFailure(err) {
        console.log(err);
      }
      function saveContact(data) {
        var contact = data;
        contactDB.save(contact)
        .then(onSaveContactSuccess, onSaveContactFailure);
      }

      $scope.onSubmit = function(mainForm) {
        var forms = $scope.forms;
        for(var i = 0; i < forms.length; i++) {
          var data = forms[i];
          var formName = 'childForm' + i;
          if(mainForm[formName].$valid) {
            saveContact(data);
          }
        }
      };

      $scope.addChildForm = function() {
        $scope.forms.push({});
      };
    }]);
})();