/**
 * Assemble
 *
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */
var convert = require('converter');
var gutil = require('gulp-util');
var es = require('event-stream');
var stream = require('stream');

var createReader = function(lines) {
  var reader = new stream.Readable();
  reader._read = function() {
    lines.map(function(line) {
      reader.push(line);
    });
    reader.push(null);
  };

  return reader;
};

var createWriter = function(finish) {
  var buffer = '';
  var writer = new stream.Writable();
  writer._write = function(chunk, enc, next) {
    buffer += chunk;
    next();
  };

  writer.toString = function() {
    return buffer;
  };

  writer.on('finish', finish);
  return writer;
};

/**
 * Do the conversion.
 * Most of this plugin code comes from the gulp
 * example.
 *
 * @param  {[Object]} options [List of options to use]
 * @return {[Stream]}         [List of File objects]
 */
module.exports = function(options) {
  var opts = options || {};

  function modifyContents(file, cb) {
    var reader = createReader([String(file.contents)]);
    var writer = createWriter(function() {
      file.path = gutil.replaceExtension(file.path, '.' + opts.to);
      file.contents = new Buffer(writer.toString());
      cb(null, file);
    });

    reader.pipe(convert(opts)).pipe(writer);
  }

  return es.map(modifyContents);
};
