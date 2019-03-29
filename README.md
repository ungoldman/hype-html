# `@hype/html`

[nanohtml][1] (and [hyperx][2]) packaged for [esm][3]

## About

Experimenting with repackaging node modules for use in the browser via ES Modules.

This is meant to be used directly on the web only.

## Usage

```js
import { html } from 'https://unpkg.com/@hype/html@0.0.3/html.js'

var hello = html`<p>👋</p>`

document.body.appendChild(hello)
```

## API

### `html`

Tagged template literal helper to create html elements.

```js
html`<div>Hello</div>`
```

## ⚠️ Disclaimer ⚠️

![I have no idea what I'm doing](http://thumbpress.com/wp-content/uploads/2013/05/I-Have-No-Idea-What-Im-Doing-1.jpg)

## Licenses

- [ISC](LICENSE.md)
- [nanohtml][1]: MIT
- [hyperx][2]: BSD

[1]: https://github.com/choojs/nanohtml/
[2]: https://github.com/choojs/hyperx/
[3]: https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/
