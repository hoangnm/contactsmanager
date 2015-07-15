(function() {
    angular.module('app')
    .controller('contactCtrl', ['$scope', 'contactDB', '$routeParams', 
        function($scope, contactDB, $routeParams) {
        var id = $routeParams.id;
        $scope.removeCustomer = removeCustomer;
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
    }]);
})();