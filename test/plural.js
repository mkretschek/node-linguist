var expect = require('expect.js')
  , plural = require('../lib/plural');


describe('linguist.plural', function () {

  it('is accessible', function () {
    expect(plural).not.to.be(undefined);
  });


  it('is an object', function () {
    expect(plural).to.be.an('object');
  });

}); // linguist.plural

