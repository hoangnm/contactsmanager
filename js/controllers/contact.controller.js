(function() {
    angular.module('app')
    .controller('contactsCtrl', ['$scope', 'contactDB', '$stateParams', 
        function($scope, contactDB, $stateParams) {
        var searchKey = $stateParams.key;
        var searchValue = $stateParams.value;
        var getDataDone = false;
        $scope.customers = [];

        $scope.onItemClick = function(customer) {
            $scope.go('contact-show', {id: customer._id});
        };
        $scope.isEmpty = function() {
            return getDataDone && $scope.customers.length === 0;
        };
        /*$scope.onPageClick = function(page) {
            getContacts(page);
        };*/

        getContacts();
        
        function getContacts() {
            contactDB.find(searchValue, searchKey)
            .then(function(res) {
                //console.log(res);
                $scope.customers = res;
                //$scope.totalItems = res.total;
                getDataDone = true;
            });
        }
        
    }])
    .controller('contactCtrl', ['$scope', 'contactDB', '$stateParams', 
        function($scope, contactDB, $stateParams) {
        var id = $stateParams.id;
        
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
                $scope.back();
            });
        }
        
        function editContact() {
            $scope.go('contact-edit', {id: id});
        }
    }])
    .controller('editContactCtrl', ['$scope', 'contactDB', '$stateParams', 
        function($scope, contactDB, $stateParams) {
        var id = $stateParams.id;

        $scope.data = {};
        $scope.onSubmit = onSubmit;
        
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
    }]);
})();