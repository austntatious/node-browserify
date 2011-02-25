var assert = require('assert');
var browserify = require('browserify');
var Script = process.binding('evals').Script;
var Lexer = require('jade/lib/lexer');

exports.single_file = function () {
    var src = browserify.bundle({
        require : 'jade/lib/lexer'
    });
    assert.ok(typeof src === 'string');
    assert.ok(src.length > 0);
    
    var c = {};
    Script.runInNewContext(src, c);
    var lex = Script.runInNewContext(
        'var Lexer = require("jade/lib/lexer"); Lexer', c
    );
    assert.eql(
        Object.keys(Lexer),
        Object.keys(lex)
    );
};
