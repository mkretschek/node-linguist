var expect = require('expect.js')
  , parser = require('../../lib/parsers/pluralRule');


describe('plural rule condition parser', function () {

  it('is accessible', function () {
    expect(parser).not.to.be(undefined);
  });


  it('is an object', function () {
    expect(parser).to.be.an('object');
  });


  it('has a #parse() method', function () {
    expect(parser).to.have.property('parse');
    expect(parser.parse).to.be.a('function');
  });


  it('parses "is relations" properly', function () {
    expect(parser.parse('n is 0')).to.be.eql([[{
      variable : 'n',
      mod : false,
      operator : 'is',
      negate : false,
      value : 0
    }]]);

    expect(parser.parse('n is not 0')).to.be.eql([[{
      variable : 'n',
      mod : false,
      operator : 'is',
      negate : true,
      value : 0
    }]]);
  });


  it('parses "in relations" properly', function () {
    expect(parser.parse('n in 0,3,10..19')).to.be.eql([[{
      variable : 'n',
      mod : false,
      operator : 'in',
      negate : false,
      rangeList : [0, 3, [10,19]]
    }]]);

    expect(parser.parse('n not in 0, 3, 10..19')).to.be.eql([[{
      variable : 'n',
      mod : false,
      operator : 'in',
      negate : true,
      rangeList : [0, 3, [10,19]]
    }]]);
  });


  it('parses "within relations" properly', function () {
    expect(parser.parse('n within 0,3,10..19')).to.be.eql([[{
      variable : 'n',
      mod : false,
      operator : 'within',
      negate : false,
      rangeList : [0, 3, [10,19]]
    }]]);

    expect(parser.parse('n not within 0, 3, 10..19')).to.be.eql([[{
      variable : 'n',
      mod : false,
      operator : 'within',
      negate : true,
      rangeList : [0, 3, [10,19]]
    }]]);
  });


  it('separates "and" conditions correctly', function () {
    expect(parser.parse('n is 0 and n not in 1..9')).to.be.eql([[{
      variable : 'n',
      mod : false,
      operator : 'is',
      negate : false,
      value : 0
    }, {
      variable : 'n',
      mod : false,
      operator : 'in',
      negate : true,
      rangeList : [[1,9]]
    }]]);
  });


  it('separates "or" conditions correctly', function () {
    expect(parser.parse('n is 0 and n is not 1 or n not in 1..9')).to.be.eql([
      [{
        variable : 'n',
        mod : false,
        operator : 'is',
        negate : false,
        value : 0
      }, {
        variable : 'n',
        mod : false,
        operator : 'is',
        negate : true,
        value : 1
      }], [{
        variable : 'n',
        mod : false,
        operator : 'in',
        negate : true,
        rangeList : [[1,9]]
      }]
    ]);
  });


}); // plural rule condition parser

