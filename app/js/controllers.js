'use strict';

/* Controllers */

var tweetCokeControllers = angular.module('tweetCokeControllers', ['ui.bootstrap','dialogs']);

tweetCokeControllers.controller('tweetListCtrl',['$scope','tweetService', '$dialogs', '$sce',
    function($scope, tweetService, $dialogs, $sce) {

        var getTweetIndexById = function(id) {
            for (var tweetNum in $scope.tweets) {
                if ($scope.tweets[tweetNum].id == id) {
                    return tweetNum;
                }
            }
            return undefined;
        }

        $scope.getTweetById = function(id) {
            return $scope.tweets[getTweetIndexById(id)];
        }

        var mapTweets = function(tweetsFromApi) {
            if (tweetsFromApi === undefined) {return undefined};
            var tweets = [];
            for (var tweetNum in tweetsFromApi) {
                var tweetFromApi = tweetsFromApi[tweetNum];
                if (tweetFromApi !== undefined &&
                    tweetFromApi.created_at !== undefined &&
                    tweetFromApi.followers !== undefined &&
                    tweetFromApi.id !== undefined &&
                    tweetFromApi.message !== undefined &&
                    tweetFromApi.sentiment !== undefined &&
                    tweetFromApi.updated_at !== undefined &&
                    tweetFromApi.user_handle !== undefined) {
                    tweets.push ({
                        created_at: tweetFromApi.created_at,
                        followers: tweetFromApi.followers,
                        id: tweetFromApi.id,
                        sentiment: tweetFromApi.sentiment,
                        updated_at: tweetFromApi.updated_at,
                        user_handle: twitterHandleModifier(tweetFromApi.user_handle),
                        message: $sce.trustAsHtml(tweetMessageStyler(tweetFromApi.message))
                    });
                }
            }
            return tweets;
        };

        var tweetMessageStyler = function(message) {
            var styledMessage = message;
            var replacements = ['coke', 'coca-cola', 'diet cola', 'coca cola']
            for (var i in replacements) {
                styledMessage = styledMessage.replace(new RegExp(replacements[i], 'ig'),"\<span style=\"color:#ff0000\">"+replacements[i]+"\</span>");
            }
            return styledMessage;
        };

        var twitterHandleModifier = function(handle) {
            return handle.replace('@', '');
        };

        $scope.getNewTweets = function() {
            tweetService.getTweet().then(function(response) {
                var tweets = mapTweets(response.data);
                if (tweets === undefined || tweets.length === 0) {
                } else {
                    for (var tweetNum in tweets) {
                        var newTweet = tweets[tweetNum];
                        var existingTweetIndexVal = getTweetIndexById(newTweet.id);
                        if (existingTweetIndexVal) {
                            $scope.tweets[existingTweetIndexVal].count++;
                        } else {
                            newTweet.count=1;
                            $scope.tweets.push(newTweet);
                        }
                    }
                }
            })
        };

        var initialiseTweets = function() {
            $scope.tweets = [];
            $scope.getNewTweets();
        };

        initialiseTweets();

    }]);