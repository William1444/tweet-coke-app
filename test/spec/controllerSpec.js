describe("Tweet Coke Controllers Spec", function() {

    describe("Map tweets from tweet service and append to scope", function() {


        var $scope,
            $provide,

            mockTweet2 = {
                created_at: "createTime",
                followers: 123,
                id: 1,
                sentiment: 0.4,
                updated_at: "updatedTime",
                user_handle: "@handle",
                message: "a message"
            },

            mockTweet1 = {
                created_at: "createTime",
                followers: 123,
                id: 2,
                sentiment: 0.4,
                updated_at: "updatedTime",
                user_handle: "@handle",
                message: "another message about coke coke"
            };

        var mockTweets = [mockTweet1,mockTweet2];

        beforeEach(angular.mock.module('tweetCokeApp'));

        beforeEach(angular.mock.module(function (_$provide_) {
            $provide = _$provide_;
        }));

        // mock the tweetservice and provide to tweetListCtrl
        beforeEach(angular.mock.inject(function($rootScope, $controller, $q){
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

        }));

        it('should have two tweets defined', function () {
            expect($scope.tweets.length).toEqual(2);
        });

        it('should replace both instances of coke', function() {
            var result = $scope.tweets[0].message;
            expect(result.$$unwrapTrustedValue().toString()).toEqual("another message about <span style=\"color:#ff0000\">coke</span> <span style=\"color:#ff0000\">coke</span>");
        });
    })

});