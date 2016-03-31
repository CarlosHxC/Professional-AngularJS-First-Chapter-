'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockDogApp')
  .directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function ($scope) {
        //Initialize variables
        $scope.watchlists = {};
        $scope.watchlist = {};
        var addListModal = $modal({
          scope: $scope,
          templateUrl: 'views/templates/addlist-modal.html',
          show: false
        });

        //Bind model from service to this scope
        $scope.watchlist = WatchlistService.query();

        //Display addlist modal
        $scope.showModal = function() {
          addListModal.$promise.then(addListModal.show);
        };

        $scope.createList = function() {
          console.log($scope.watchlists);
          WatchlistService.save($scope.watchlists);
          addListModal.hide();
          $scope.watchlists = {};
        };

        //Delete
        $scope.deleteList = function(list) {
          console.log(list);
          WatchlistService.remove(list);
          $location.path('/');
        };

        $scope.currentList = $routeParams.listId;
        $scope.gotoList = function(listId) {
          $location.path('watchlist/' + listId);
        };
      }
    };
  });
