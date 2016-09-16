# gulp-noopener

Warns you about (or adds for you) `rel="noopener"`` to relevant HTML  tags, `<a>` and `<form>`, that have their `target` set.

## Install

`npm install gulp-noopener --save`

## Usage

Display warnings.

```js
var noopener = require('gulp-noopener');

gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(noopener.warn())
    .pipe(gulp.dest('output'));
});
```

Overwrite.  Uses regex to overwrite, so use with caution.

```js
var noopener = require('gulp-noopener');

gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(noopener.overwrite())
    .pipe(gulp.dest('output'));
});
```
