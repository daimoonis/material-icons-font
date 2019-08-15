# material-icons-font
Material design icons font

## Description
Based on Material design icons font to simplify process of building new Angular typescript application to serve icons font definition from vendor package (e.g. npm node_modules), without the need to insert direct link to online google fonts in html head section manually.

## Installation

Load directly from GIT e.g. via bower

or

npm install material-icons-font --save

Version 1.x is based on https://github.com/google/material-design-icons

Version 2.x is based on community update at https://github.com/jossef/material-design-icons-iconfont

## Usage

### Direct css usage

Insert css into your build setup directly.

E.g. into Angular CLI main configuration styles

```
...
"styles": [
        "../node_modules/material-icons-font/material-icons-font.css"
    ],
...
```

### Import SCSS into your own SCSS files

Angular CLI with scss styles extension example:

```
@import '~material-icons-font/sass/variables'; // mandatory and at first place
@import '~material-icons-font/sass/mixins'; // mandatory and after variables
// there you can change default variables if they are not good enough for you
$MaterialIcons_FontPath: "~material-icons-font/fonts"; // for CLI project we change font path to point into package fonts folder
@import '~material-icons-font/sass/main'; // mandatory main material font definition
@import '~material-icons-font/sass/Regular'; // mandatory @font-face definition

// @import '~material-icons-font/sass/sizing'; // optional rules for icons sizing recommended by font designers
// @import '~material-icons-font/sass/coloring'; // optional rules for icons color rules with light and dark background and inactive state

```

### At last, just use it in your app

directly

```
<i class="material-icons">face</i>
<i class="material-icons md-48">face</i>
<i class="material-icons md-dark">face</i>
<i class="material-icons md-48 md-dark md-inactive">face</i>
<i class="material-icons md-light md-inactive">face</i>
```

with Angular Material

```
<mat-icon>add_alarm</mat-icon>
<mat-icon>adjust</mat-icon>
```

or else...
