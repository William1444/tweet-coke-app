'use strict';

/* Filters */

angular.module('tweetCokeFilters', []).filter('anexamplefilter', function() {
  return function(input) {
    return input ? 'in' : 'out';
  };
});
