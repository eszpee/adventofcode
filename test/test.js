var assert = require('assert');

// day 07

var arrayMin = require('../src/day07.js');

describe('General helper functions', function() {
  describe('arrayMin', function() {
    it('[0,1,2] => 0', function() {
      assert.equal(arrayMin([0,1,2]), 0);
    });
  });
});

