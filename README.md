# Spinners React
[![npm](https://img.shields.io/npm/v/spinners-react.svg)](http://npm.im/spinners-react) [![License](https://img.shields.io/github/license/adexin/spinners-react.svg)](https://github.com/adexin/spinners-react/blob/master/LICENSE.md) [![Build Status](https://img.shields.io/travis/com/adexin/spinners-react/master.svg)](https://travis-ci.com/github/adexin/spinners-react) [![Coverage Status](https://coveralls.io/repos/github/adexin/spinners-react/badge.svg?branch=master)](https://coveralls.io/github/adexin/spinners-react?branch=master) [![gzip size](http://img.badgesize.io/https://unpkg.com/spinners-react/lib/umd/index.min.js?compression=gzip&label=gzip)](https://unpkg.com/spinners-react/lib/umd/index.min.js)


9 awesome typescript-aware lightweight spinners built as react.js components.

<p align="center">
  <a href="http://adexin.github.io/spinners">
    <img src="https://i.imgur.com/xa7eWLW.gif" />
  </a>
</p>

## Demo
[View demo](https://adexin.github.io/spinners/) with examples of react.js component usage.

## Getting started
### Installation
```
$ npm install spinners-react
```
**or** [add it directly to HTML page](#UMD-bundle-usage)

### Usage
```
import { SpinnerCircular } from 'spinners-react';

<SpinnerCircular />
```

### Hide spinner
```
<SpinnerCircular enabled={false} />
```

### List of components

| Component | Example | Component | Example | Component | Example |
|-----------|---------|-----------|---------|-----------|---------|
|`SpinnerCircular`|<img width="70" src="https://i.imgur.com/o89jDAP.gif" />|`SpinnerCircularFixed`| <img width="70" src="https://i.imgur.com/tTAGJCm.gif" />|`SpinnerCircularSplit`| <img width="70" src="https://i.imgur.com/bnmc9Ww.gif" />|
|`SpinnerRound`   |<img width="70" src="https://i.imgur.com/ankNNb4.gif" />|`SpinnerRoundOutlined`|<img width="70" src="https://i.imgur.com/EGAQ1zI.gif" /> |`SpinnerRoundFilled`  |<img width="70" src="https://i.imgur.com/izh0T8z.gif" />|
|`SpinnerDotted`  |<img width="70" src="https://i.imgur.com/PRsEM0Y.gif" />|`SpinnerInfinity`     |<img width="70" src="https://i.imgur.com/gdvE3yw.gif" /> |`SpinnerDiamond`      |<img width="70" src="https://i.imgur.com/P2lUfRy.gif" />|

## Properties
The following optional properties are available. All extra props will be passed to the component's root SVG element.

| Property     | Default value      | Type           | Description |
|--------------|--------------------|----------------|-------------|
|size          |`50`                |number or string|Set the size as number of pixels or any valid CSS string (e.g. `size="100%"`).|
|thickness     |`100`               |number          |Set lines width as a percentage of default thickness.|
|сolor         |`'#38ad48'`         |string          |Set the color. Can be set to any valid CSS string (hex, rgb, rgba).|
|secondaryColor|`'rgba(0,0,0,0.44)'`|string          |Set the secondary color. Can be set to any valid CSS string (hex, rgb, rgba).|
|speed         |`100`               |number          |Set the animation speed as a percentage of default speed.|
|enabled       |`true`              |boolean         |Show/Hide the spinner.|
|still         |`false`             |boolean         |Disable/Enable spinner animation.|
|style         |undefined           |object          |Pass CSS styles to the root SVG element|

## Server Side Rendering
While the library works with SSR, the spinner's animation CSS will be attached to the head only on the ```hydrate``` phase, which means the spinners will start animating only after the page is fully loaded. To work around this, include the needed css in your bundle.css manually:
```
/* App.css */

/* to load animation for a specific spinner */
@import "~spinners-react/lib/SpinnerCircular.css";

/* to load animations for all spinners at once */
@import "~spinners-react/lib/index.css";
```

## Minimizing Bundle Size
The library is thin and do not rely on any style library / runtime to be used. To reduce the bundle size even more load only the used components.
If you're using ES6 modules and a bundler that supports tree-shaking you can safely use named imports:
```
import { SpinnerCircular } from 'spinners-react';
```
It that's not the case you're able to use path imports to avoid pulling in unused spinners:
```
// ESM
import { SpinnerCircular } from 'spinners-react/lib/esm/SpinnerCircular';
// or CJS
const { SpinnerCircular } = require('spinners-react/lib/cjs/SpinnerCircular');
// or UMD
const { SpinnerCircular } = require('spinners-react/lib/cjs/SpinnerCircular');

```

## UMD bundle usage
```
<!doctype html>
<html>
  <head>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <!-- to load a specific spinner -->
    <script src="https://unpkg.com/spinners-react/lib/umd/SpinnerCircular.min.js"></script>
    <!-- to load all spinners at once -->
    <script src="https://unpkg.com/spinners-react/lib/umd/index.min.js"></script>
  </head>

  <body>
    <div id="root"></div>
    <script>
      ReactDOM.render(
        React.createElement(SpinnersReact.SpinnerCircular),
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br> Edge |
| --------- | --------- | --------- | --------- | --------- |
| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions*

**\*** - Legacy EdgeHTML Edge (i.e. 42-44) is also supported except for `SpinnerRound` and `SpinnerRoundOutlined`.

## Issues and Bugs

Let us know if you [found a bug](https://github.com/adexin/spinners-react/issues)!

## Spinners for other frameworks

- [spinners-angular](https://github.com/adexin/spinners-angular)

## Support and Contact

Have a quick question or need some help? Please do not hesitate to contact us via email at info@adexin.com.

## Credits

This component is developed by consulting agency [Adexin](https://adexin.com/).

## License

Spinners React is released under MIT license. You are free to use, modify and distribute this software, as long as the copyright header is left intact.
