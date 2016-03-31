'use strict';

angular.module('stockDogApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
    $scope.watchlists2 = WatchlistService.query();
    $scope.$watch(function() {
      return $location.path();
    }, function(path) {
      console.log(path);
      if(path.indexOf('watchlist') >= 0) {
        $scope.activeView = 'watchlist'
      } else {
        $scope.activeView = 'dashboard'
      }
    })
  });
