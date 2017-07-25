var through = require('through2');
var path = require('path');

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {

        }
        else if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }
        else if (file.isBuffer()) {
            var oldLen = file.contents.length;
            var content = process(file.contents.toString(), options || {});
            file.contents = new Buffer(content);

            var delta = oldLen - file.contents.length;
            if (delta > 0) {
                var fn = file.history[0] || '';
                fn = path.basename(fn);
                console.log('gulp-ifdebug:\t' + fn + '\t' + delta + ' bytes droped');
            }
        }

        this.push(file);

        cb();

        function process(js, opt) {
            var isDebug = opt.isDebug !== false; //默认isDebug为true
            var reg = /\/\*IFDEBUG([\s\S]+?)FIDEBUG\*\//g;
            return js.replace(reg, isDebug ? "$1" : "");
        }
    });
};