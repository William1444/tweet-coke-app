'use strict';

describe('Tweet Service Spec', function() {

  // load modules
  beforeEach(module('tweetCokeApp'));

  // Test service availability
  it('should initialise the Tweet Service', inject(function(tweetService) {
      expect(tweetService).toBeDefined();
    }));
});