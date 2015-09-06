/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Scott Beck @bline
 */
var loaderUtils = require("loader-utils");

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    return target
}

module.exports = function (source) {
    this.cacheable && this.cacheable(true);
    var jade = require("jade");
    var query = loaderUtils.parseQuery(this.query);
    var req = loaderUtils.getRemainingRequest(this).replace(/^!/, "");
    var opts = extend({}, {filename: req}, query);

    if (!opts.doctype) {
        opts.doctype = 'html';
    }

    var tmplFunc = jade.compile(source, extend(opts, {compileDebug: this.debug || false}));

    return tmplFunc(query.locals);
}
