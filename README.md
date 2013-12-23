# gulp-convert [![NPM version][npm-image]][npm-url] [![Build status][build-image]][build-url]

## Work In Progress
This plugin is not completely ready yet.

## Usage

First, install `gulp-convert` as a development dependency:

```shell
npm install --save-dev gulp-convert
```

Then, add it to your `gulpfile.js`:

```javascript
var convert = require('gulp-convert');

gulp.task('csv2json', function(){
  gulp.src(['data/csv/*.csv'])
    .pipe(convert({
      from: 'csv',
      to: 'json'
     }))
    .pipe(gulp.dest('data/json/'));
});
```

## API

### convert(options)

#### options.from
Type: `String`  
Default: `csv`

File type converting from.

#### options.to
Type: `String`  
Default: `json`

File type converting to.

[build-url]: https://github.com/assemble/gulp-convert
[build-image]: https://github.com/assemble/gulp-convert.png
[npm-url]: https://npmjs.org/package/gulp-convert
[npm-image]: https://badge.fury.io/js/gulp-convert.png