var app = angular.module("ascii-warehouse", ['smart-table', 'ui.bootstrap', 'angularMoment'])
    .controller("mainCtrl", function ($scope, $http, Products) {
        $scope.loadingPage = true;
        $scope.loadingMore = false;
        $scope.init = init;
        $scope.loadMoreAscii = loadMoreAscii;
        $scope.products = '';
        $scope.finish = false;


        function init() {
            Products.getProducts(0, 20)
                .then(function (products) {
                    $scope.products = products;
                    $scope.loading = false;
                });
        }

        function loadMoreAscii() {
            if ($scope.products.length >= 100) {
                $scope.finish = true;
            } else {
                $scope.loadingMore = true;
                Products.getProducts($scope.products.length, 10)
                    .then(function (products) {
                        products.forEach(function (prod) {
                            $scope.loadingMore = false;
                            $scope.products.push(prod);
                        });
                    });
            }
        }

        $scope.init()

    });