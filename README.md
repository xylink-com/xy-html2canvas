xy-html2canvas
===========

此代码库是基于[html2canvas](https://html2canvas.hertzen.com/)插件开发，由于html2canvas插件不支持video截屏，因此在此基础作了修改

### Browser compatibility ###

The library should work fine on the following browsers (with `Promise` polyfill):

* Firefox 3.5+
* Google Chrome
* Opera 12+
* IE9+
* Safari 6+

As each CSS property needs to be manually built to be supported, there are a number of properties that are not yet supported.

### Usage ###

The html2canvas library utilizes `Promise`s and expects them to be available in the global context. If you wish to
support [older browsers](http://caniuse.com/#search=promise) that do not natively support `Promise`s, please include a polyfill such as
[es6-promise](https://github.com/jakearchibald/es6-promise) before including `html2canvas`.

To render an `element` with html2canvas, simply call:
` html2canvas(element[, options]);`

The function returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing the `<canvas>` element. Simply add a promise fulfillment handler to the promise using `then`:

    html2canvas(document.body).then(function(canvas) {
        document.body.appendChild(canvas);
    });