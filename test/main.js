
var convert = require('../');
var should = require('should');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;
require('mocha');

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
			console.log(data.contents.toString());
			done();
		});

		converter.write(fakeFile);
		converter.end();

  });  

});