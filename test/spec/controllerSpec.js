describe("Tweet Coke Controllers Spec", function() {

    describe("Map tweets from tweet service and append to scope", function() {


        var $scope,
            $provide,

            mockTweet1 = {
                created_at: "createTime",
                followers: 123,
                id: 11,
                sentiment: 0.4,
                updated_at: "updatedTime",
                user_handle: "@handle",
                message: "a message"
            },

            mockTweet2 = {
                created_at: "createTime",
                followers: 123,
                id: 12,
                sentiment: 0.4,
                updated_at: "updatedTime",
                user_handle: "@handle",
                message: "another message about coke coke"
            },

            mockInvalidTweetNoUserHandle = {
                created_at: "createTime",
                followers: 123,
                id: 12,
                sentiment: 0.4,
                updated_at: "updatedTime",
                message: "another message about coke coke"
            },
            mockInvalidTweetNoMessage = {
                created_at: "createTime",
                followers: 123,
                id: 12,
                sentiment: 0.4,
                updated_at: "updatedTime",
                user_handle: "@handle"
            },
            mockInvalidTweetNoSentiment = {
                created_at: "createTime",
                followers: 123,
                id: 12,
                updated_at: "updatedTime",
                user_handle: "@handle",
                message: "another message about coke coke"
            },


            createControllerWithMockedTweetServiceThatReturns = function(mockTweets) {
                angular.mock.inject(function($rootScope, $controller, $q){
                    var tweetServiceMock = {
                        getTweet : function() {
                            var deferred = $q.defer();
                            deferred.resolve(
                                { data: mockTweets}
                            );
                            return deferred.promise;
                        }
                    };
                    $provide.value('tweetService', tweetServiceMock);
                    $scope = $rootScope.$new();
                    $controller('tweetListCtrl', { $scope: $scope });
                    $rootScope.$apply();

                })
            };

        beforeEach(angular.mock.module('tweetCokeApp'));

        beforeEach(angular.mock.module(function (_$provide_) {
            $provide = _$provide_;
        }));

        it('should ignore tweets from service where message is blank', function () {
            var mockTweets=[mockInvalidTweetNoMessage];
            createControllerWithMockedTweetServiceThatReturns(mockTweets);
            expect($scope.tweets.filter(String).length).toEqual(0);
        });

        it('should ignore tweets from service where sentiment is not pupulated', function () {
            var mockTweets=[mockInvalidTweetNoSentiment];
            createControllerWithMockedTweetServiceThatReturns(mockTweets);
            expect($scope.tweets.filter(String).length).toEqual(0);
        });

        it('should ignore tweets from service where user handle is not pupulated', function () {
            var mockTweets=[mockInvalidTweetNoUserHandle];
            createControllerWithMockedTweetServiceThatReturns(mockTweets);
            expect($scope.tweets.filter(String).length).toEqual(0);
        });

        it('should have two tweets defined', function () {
            var mockTweets=[mockTweet1, mockTweet2];
            createControllerWithMockedTweetServiceThatReturns(mockTweets);
            expect($scope.tweets.filter(String).length).toEqual(2);
        });

        it('should replace both instances of coke', function() {
            var mockTweets=[mockTweet1, mockTweet2];
            createControllerWithMockedTweetServiceThatReturns(mockTweets);
            var result = $scope.getTweetById(12).message;
            expect($scope.tweets.filter(String).length).toEqual(2);
            expect(result.$$unwrapTrustedValue().toString()).toEqual("another message about <span style=\"color:#ff0000\">coke</span> <span style=\"color:#ff0000\">coke</span>");
        });

        it('should deduplicate tweets with the same id', function() {
            var mockTweets=[mockTweet1, mockTweet2, mockTweet2];
            createControllerWithMockedTweetServiceThatReturns(mockTweets);
            expect($scope.tweets.filter(String).length).toEqual(2);
        })

        it('should count tweets with the same id', function() {
            var mockTweets=[mockTweet1, mockTweet2, mockTweet2];
            createControllerWithMockedTweetServiceThatReturns(mockTweets);

            expect($scope.getTweetById(11).count).toEqual(1);
            expect($scope.getTweetById(12).count).toEqual(2);
        })

    })

});