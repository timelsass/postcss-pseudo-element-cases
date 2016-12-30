# PostCSS Pseudo-Element Casing

[PostCSS](https://github.com/postcss/postcss) plugin to format pseudo elements to uppercase or lowercase.

Turn `.fancy-style::BEFORE {` into `.fancy-style::before {` and vice versa.

### Jump To Section
- [Installation](#installation)
- [Usage](#usage)
  - [postcss-cli](#with-postcss-cli)
  - [node.js](#with-nodejs)
  - [grunt.js](#grunt-with-grunt-postcss)
  - [gulp.js](#gulpjs-with-gulp-postcss)
- [Options](#options)
  - [Defaults](#default-options)
  - [selectors](#selectors)
  - [case](#case)
- [Examples](#examples)
  - [Enforced Lowercase](#enforced-lowercase)
  - [Enforced Uppercase](#enforced-uppercase)

---

## Installation

```
$ npm install postcss-pseudo-element-cases --save-dev
```
*Note:  This plugin is for [PostCSS](https://github.com/postcss/postcss).*

## Usage

### With postcss-cli

```shell
$ postcss --use postcss-pseudo-element-cases style.css
```
*Note:  This requires [postcss-cli](https://github.com/postcss/postcss-cli).*

### With Node.js:
```js
var fs           = require( 'fs' ),
    postcss      = require( 'postcss' ),
    pseudoCases  = require( 'postcss-pseudo-element-cases' );

const
  options = {
    "case": "upper"
  };

fs.readFile( './style.css', ( err, css ) => {
  postcss( [pseudoCases( options )] )
    .process( css, {
      from: './style.css',
      to: './style.css'
    }).then( result => {
      fs.writeFile( './style.css', result.css,
        function( err ) {
          if ( err ) throw err;
        });
    }).catch( ( err ) => {
      console.log( err );
    });
});
```

### Grunt with [grunt-postcss](https://github.com/nDmitry/grunt-postcss/)

Running default options:

```js
module.exports = function( grunt ) {
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require( 'postcss-pseudo-element-cases' )
        ]
      },
      dist: {
        src: 'src/style.css',
        dest: 'dist/style.css'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-postcss' );
};
```

Running custom options:

```js
module.exports = function( grunt ) {
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require( 'postcss-pseudo-element-cases' )({
            "selectors": [
                "before",
                "after"
            ],
            "case": "upper"
          })
        ]
      },
      dist: {
        src: 'src/style.css',
        dest: 'dist/style.css'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-postcss' );
};
```

### Gulp.js with [gulp-postcss](https://github.com/postcss/gulp-postcss)

```js
var gulp         = require( 'gulp' );
var postcss      = require( 'gulp-postcss' );
var pseudoCases  = require( 'postcss-pseudo-element-cases' );

const
  options = {
    "case": "upper"
  };

gulp.task( 'postcss', function(){
	gulp.src( 'src/style.css' )
		.pipe( postcss( [ pseudoCases( options ) ] ) )
		.pipe( gulp.dest( 'dist' ) );
});
```

## Options

### Default Options:

```json
{
  "selectors": [
    "before",
    "after",
    "first-letter",
    "first-line",
    "selection",
    "spelling-error",
    "grammar-error",
    "backdrop",
    "marker",
    "placeholder",
    "shadow",
    "slotted",
    "content"
  ],
  "case": "lower"
}
```

### selectors

Accepts array of pseudo-elements which should have casing enforced in your stylesheet.


### case

Accepts `"upper"` or  `"lower"` for the psudeo-element's casing.

`"upper"` produces syntax like: `.fancy-style::BEFORE {`

`"lower"` produces syntax like `.fancy-style::before {`


## Examples

### Enforced Lowercase

Before enforcing lowercase with the case [option](#case) ( default ):

```css
.fancy-style::FIRST-LINE {
  font-variant: small-caps;
}
.fancy-style:Before, .fancy-style::AFTER {
  content: "";
}
.fancy-style:first-letTer {
  color: blue;
}
```

After running the PostCSS plugin:

```css
.fancy-style::first-line {
  font-variant: small-caps;
}
.fancy-style:before, .fancy-style::after {
  content: "";
}
.fancy-style:first-letter {
  color: blue;
}
```

### Enforced Uppercase

Before enforcing uppercase with the case [option](#case):

```css
.fancy-style::first-line {
  font-variant: small-caps;
}
.fancy-style:BEFORE, .fancy-style:aFter {
  content: "";
}
.fancy-style::First-letter {
  color: blue;
}
```

After running the PostCSS plugin:

```css
.fancy-style::FIRST-LINE {
  font-variant: small-caps;
}
.fancy-style:BEFORE, .fancy-style:AFTER {
  content: "";
}
.fancy-style::FIRST-LETTER {
  color: blue;
}
```