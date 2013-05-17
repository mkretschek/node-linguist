/*jslint es5 : true, node : true, indent : 4 */
module.exports = (function () {
    'use strict';
    
    var config, fs, parser, path, string;
    
    path = require('path');
    fs = require('fs');
    config = require('./config');
    string = require('foojs').string;
    
    parser = {
        rule : require('./parsers/pluralRule.js')
    };
    
    return {
        parser : parser
    };
}());
