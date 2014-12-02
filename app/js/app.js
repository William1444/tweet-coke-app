'use strict';

/* App Module */

var tweetCokeApp = angular.module('tweetCokeApp', [
  'ngRoute',
  'ngSanitize',
  'tweetCokeControllers',
  'tweetCokeFilters',
  'tweetCokeServices'
]);

tweetCokeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/tweets', {
            templateUrl: 'partials/tweet-list.html',
            controller: 'tweetListCtrl'
      }).
      otherwise({
        redirectTo: '/tweets'
      });
  }]);
