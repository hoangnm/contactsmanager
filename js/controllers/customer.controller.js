(function() {
    angular.module('app')
    .controller('customerCtrl', ['$scope', 'customerDB', '$routeParams', 
        function($scope, customerDB, $routeParams) {
        var id = $routeParams.id;
        $scope.removeCustomer = removeCustomer;
        getCustomer();
        function getCustomer() {
            customerDB.findById(id)
            .then(function(res) {
                $scope.customer = res;
            });
        }
        function removeCustomer() {
            customerDB.remove(id)
            .then(function(res) {
                alert('Xóa thành công!');
                $scope.go('/');
            });
        }
    }])
    .controller('newCustomerCtrl', ['$scope', 'customerDB', function($scope, customerDB) {
        $scope.data = {};
        $scope.onSubmit = function(form) {
            if(form.$valid) {
                customerDB.save($scope.data)
                .then(function() {
                    alert('Lưu thành công!');
                    $scope.data = {};
                }, function(err) {
                    alert(err);
                });
            }
        };
    }]);
})();