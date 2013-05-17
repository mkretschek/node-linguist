var expect = require('expect.js')
  , linguist = require('../lib/linguist');


describe('linguist', function () {

  it('is accessible', function () {
    expect(linguist).not.to.be(undefined);
  });


  it('is an object', function () {
    expect(linguist).to.be.an('object');
  });

}); // linguist

