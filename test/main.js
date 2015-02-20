'use strict';
var assert = require('assert');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;

var convert = require('../');

describe('gulp-convert', function() {

	it('should convert csv to json', function(done) {
		var options = {
			from: 'csv',
			to: 'json'
		};

		var converter = convert(options);

		var fakeFile = new File({
			cwd: "/home/contra/",
			base: "/home/contra/test",
			path: "/home/contra/test/file.csv",
			contents: new Buffer("first,second,third\none,two,three\n4,5,6")
		});

		converter.on('data', function(data) {
			var json = JSON.parse(data.contents);
			assert.deepEqual(json, [
				{ first: 'one', second: 'two', third: 'three' },
				{ first: '4', second: '5', third: '6' }
			]);

			done();
		});

		converter.write(fakeFile);
		converter.end();

  });

});
