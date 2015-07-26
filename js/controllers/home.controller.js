(function() {
  angular.module('app')
    .controller('homeCtrl', ['$rootScope','$scope', 'contactDB', 
      function($rootScope, $scope, contactDB) {
      $scope.rowsToAdd = 1;
      $scope.forms = [{}];
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
        if(contacts.length > 0) {
          contactDB.saveMultiple(contacts)
          .then(function() {
            alert('done');
            $scope.forms = [{}];
          });
        }
      };

      $scope.addChildForm = function(rowsToAdd) {
        while(rowsToAdd > 0) {
          $scope.forms.push({});
          rowsToAdd--;
        }
      };
    }]);
})();