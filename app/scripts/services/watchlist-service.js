'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var StockModel = {
      save: function() {
        var watchlist = findById(this.list);
        watchlist.recalculate();
        saveModel();
      }
    };

    var WatchlistModel = {
      addStock: function(stock) {
        console.log(this.stocks);
        var existingStock = _.find(this.stocks, function(s) {
          // console.log(s.company === stock.company);
          return s.company === stock.company;
        });
        if(existingStock) {
          existingStock.shares += stock.shares;
        } else {
          _.extend(stock, StockModel);
          console.log(this.stocks);
          this.stocks.push(stock);
        }
        this.recalculate();
        saveModel();
      },
      removeStock: function(stock) {
        _.remove(this.stocks, function(s) {
          return s.company.symbol === stock.company.symbol;
        });
        this.recalculate();
        saveModel();
      },
      recalculate: function() {
        var calcs = _.reduce(this.stocks, function(calcs, stock) {
          calcs.shares += stock.shares;
          calcs.marketValue += stock.marketValue;
          calcs.dayChange += stock.dayChange;
          return calcs;
        }, {shares: 0, marketValue: 0, dayChange: 0});

        this.shares = calcs.shares;
        this.marketValue = calcs.marketValue;
        this.dayChange = calcs.dayChange;
      }
    };


    //Load watchlists from localStorage
    var loadModel = function() {
      var model = {
        watchlists: localStorage['StockDog.watchlists'] ?
          JSON.parse(localStorage['StockDog.watchlists']) : [],
        nextId: localStorage['StockDog:nextId'] ?
          parseInt(localStorage['StockDog:nextId']) : 0
      };
      _.each(model.watchlists, function(watchlist) {
        _.extend(watchlist, WatchlistModel);
        _.each(watchlist.stocks, function(stock) {
          _.extend(stock, StockModel);
        });
      });
      console.log(model);
      return model;
    };

    //Save watchlists to localStorage
    var saveModel = function() {
      localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
      localStorage['StockDog.nextId'] = Model.nextId;
    };

    //Use lodash to find a watchlist with given ID
    var findById = function(listId) {
      return _.find(Model.watchlists, function(watchlist) {
        console.log(watchlist.id === parseInt(listId));
        return watchlist.id === parseInt(listId);
      });
    };

    //Return all watchlist
    this.query = function(listId) {
      if(listId) {
        return findById(listId);
      } else {
        return Model.watchlists;
      }
    };

    //Save a new watchlist to watchlists model
    this.save = function(watchlist) {
      console.log(Model);
      watchlist.id = Model.nextId++;
      watchlist.stocks = [];
      _.extend(watchlist, WatchlistModel)
      Model.watchlists.push(watchlist);
      saveModel();
    };

    //Removing given watchlist from watchlists models
    this.remove = function(watchlist) {
      _.remove(Model.watchlists, function(list) {
        return list.id === watchlist.id;
      });

      saveModel();
    };

    //Initialize mode for the singleton service
    var Model = loadModel();

  });
