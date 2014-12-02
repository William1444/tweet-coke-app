'use strict';

/* Services */

var tweetCokeServices = angular.module('tweetCokeServices', ['ngResource','ui.bootstrap','dialogs']);

tweetCokeServices.factory('tweetService', function($http, $dialogs){
    return {
        getTweet: function(){
            return $http.get('http://adaptive-test-api.herokuapp.com/tweets.json')
                .error(function(data, status, headers, config) {
                    $dialogs.notify("Couldn't get the latest Coke Tweets.. please try again later");
            });
        }
    }
});
