(function() {
    angular.module('app')
    .controller('contactCtrl', ['$scope', 'contactDB', '$routeParams', 
        function($scope, contactDB, $routeParams) {
        var id = $routeParams.id;
        
        $scope.removeCustomer = removeCustomer;
        $scope.editContact = editContact;

        getCustomer();
        
        function getCustomer() {
            contactDB.findById(id)
            .then(function(res) {
                $scope.customer = res;
            });
        }
        
        function removeCustomer() {
            contactDB.remove(id)
            .then(function(res) {
                alert('Xóa thành công!');
                $scope.go('/');
            });
        }
        
        function editContact() {
            $scope.go('contact-edit/' + id);
        }
    }])
    .controller('newContactCtrl', ['$scope', 'contactDB', function($scope, contactDB) {
        $scope.data = {};
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
    }])
    .controller('editContactCtrl', ['$scope', 'contactDB', '$routeParams', 
        function($scope, contactDB, $routeParams) {
        var id = $routeParams.id;

        $scope.data = {};
        $scope.onSubmit = onSubmit;
        $scope.goBack = goBack;
        
        getContact();

        function getContact() {
            contactDB.findById(id)
            .then(function(res) {
                $scope.data = res;
            });
        }
        
        function onSubmit(form) {
            if(form.$valid) {
                contactDB.update($scope.data)
                .then(function() {
                    alert('Cập nhật thành công!');
                }, function(err) {
                    alert(err);
                });
            }
        }

        function goBack() {
            $scope.go('contact/' + id);
        }
    }]);
})();