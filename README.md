# gulp-noopener

Adds rel="noopener" to relevant HTML (`<a>` and `<form>`).

## Install

`npm install gulp-noopener --save`

## Usage

```js
var noopener = require('gulp-noopener');


gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(noopener())
    .pipe(gulp.dest('output'));
});
```
