'use strict';

angular.module('stockDogApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {
    $scope.companies = CompanyService.query();
    $scope.watchlist = WatchlistService.query($routeParams.listId);
    $scope.stocks = $scope.watchlist.stocks;
    console.log($scope.stocks);
    $scope.newStock = {};
    var addStockModal = $modal({
      scope: $scope,
      templateUrl: 'views/templates/addstock-modal.html',
      show: false
    });

    $scope.showStockModal = function() {
      addStockModal.$promise.then(addStockModal.show);
    };

    $scope.addStock = function() {
      $scope.watchlist.addStock({
        listId: $routeParams.listId,
        company: $scope.newStock.company,
        shares: $scope.newStock.shares
      });
      console.log($scope.watchlist);
      addStockModal.hide();
      $scope.newStock = {};
    };
  });
