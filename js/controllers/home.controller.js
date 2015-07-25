(function() {
  angular.module('app')
    .controller('homeCtrl', ['$rootScope','$scope', 'contactDB', 'excelService',
      function($rootScope, $scope, contactDB, excelService) {
      //$scope.data = {};
      $scope.forms = [{}];
      $scope.importExcel = function (file) {
        if(file) {
          var path = file.path;
          excelService.importToDB(path)
          .then(function(res) {
            alert('done');
          });
        }
      };
      $scope.checkContact = function(contact) {
        
      };

      $scope.onSubmit = function(mainForm) {
        var forms = $scope.forms;
        var contacts = [];
        for(var i = 0; i < forms.length; i++) {
          var data = forms[i];
          var formName = 'childForm' + i;
          if(mainForm[formName].$valid) {
            contacts.push(data);
          }
        }
        contactDB.saveMultiple(contacts)
        .then(function() {
          alert('done');
          $scope.forms = [{}];
        });
      };

      $scope.addChildForm = function(rowsToAdd) {
        while(rowsToAdd > 0) {
          $scope.forms.push({});
          rowsToAdd--;
        }
      };
    }]);
})();