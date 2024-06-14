# Nextjs Darkmode <img src="https://github.com/react18-tools/nextjs-darkmode/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/nextjs-darkmode/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/nextjs-darkmode/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/ebffdafb7f4984d742b6/maintainability)](https://codeclimate.com/github/react18-tools/nextjs-darkmode/maintainability) [![codecov](https://codecov.io/gh/react18-tools/nextjs-darkmode/graph/badge.svg)](https://codecov.io/gh/react18-tools/nextjs-darkmode) [![Version](https://img.shields.io/npm/v/nextjs-darkmode.svg?colorB=green)](https://www.npmjs.com/package/nextjs-darkmode) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nextjs-darkmode.svg)](https://www.npmjs.com/package/nextjs-darkmode) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-darkmode) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

Nextjs Darkmode is a versatile library crafted to fully utilize React 18 server components, ensuring a seamless dark mode experience in Next.js applications. Lightweight and efficient, it respects both user preferences and system settings through the prefers-color-scheme media query, and integrates effortlessly with React/Vite, Remix, and Next.js.

## Motivation

The `nextjs-themes` library was initially created to achieve a similar functionality to `next-themes` with React Server Components. While effective, it felt bulky for those supporting only dark/light mode. Thus, `nextjs-darkmode` was developed to offer a minimal footprint while utilizing Next.js Server Components, avoiding any flash of unthemed content, and ensuring theme synchronization with the server.

## Features

- ✅ Simple API to toggle between dark and light modes

- ✅ Perfect dark mode with just 2 lines of code

- ✅ Compatible with Tailwind CSS, StyledComponents, emotion, Material UI, ...

- ✅ Secure by design - we support `nonce` when you want to apply Content Security Policy

- ✅ Fully treeshakable (e.g., `import from nextjs-darkmode/hooks`)

- ✅ Full TypeScript support

- ✅ Utilizes React 18 Server components

- ✅ Compatible with all React 18 build systems/tools/frameworks

- ✅ System setting with `prefers-color-scheme`

- ✅ Supports Next.js 13 & 14 `appDir`

- ✅ No flash on load (supports SSG, SSR, ISG, and Server Components)

- ✅ Sync theme across tabs and windows

- ✅ Apply custom transitions when changing themes

- ✅ Manipulate theme via the `useMode` hook

- ✅ No cookies when not using the corresponding `ServerTarget`

- ✅ Comprehensive documentation with [Typedoc](https://react18-tools.github.io/nextjs-darkmode)

Feel free to [request new features](https://github.com/react18-tools/nextjs-darkmode/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=), [discuss](https://github.com/react18-tools/nextjs-darkmode/discussions), or [report bugs](https://github.com/react18-tools/nextjs-darkmode/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=).

Please consider starring [this repository](https://github.com/react18-tools/nextjs-darkmode) and sharing it with your friends.

## Getting Started

### Installation

```bash
$ pnpm add nextjs-darkmode
```

**_or_**

```bash
$ npm install nextjs-darkmode
```

**_or_**

```bash
$ yarn add nextjs-darkmode
```

### Import Styles

Import styles globally or within layout component.

```css
/* globals.css */
@import "nextjs-darkmode/css";
```

```tsx
// layout.tsx
import "nextjs-darkmode/css";
```

## Lite Version

For a lighter version, use `nextjs-darkmode-lite`:

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-darkmode-lite)](https://www.npmjs.com/package/nextjs-darkmode-lite) [![Version](https://img.shields.io/npm/v/nextjs-darkmode-lite.svg?colorB=green)](https://www.npmjs.com/package/nextjs-darkmode-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nextjs-darkmode-lite.svg)](https://www.npmjs.com/package/nextjs-darkmode-lite)

```bash
$ pnpm add nextjs-darkmode-lite
```

**_or_**

```bash
$ npm install nextjs-darkmode-lite
```

**_or_**

```bash
$ yarn add nextjs-darkmode-lite
```

> You need `r18gs` as a peer-dependency.

## Usage

> Please explore `examples` and `packages/shared-ui` for more working examples. (updates coming soon...)

### SPA (e.g., Vite, CRA) and Next.js pages directory (No server components)

Modify `_app` to add dark mode support:

```js
import { Core } from "nextjs-darkmode"; // for better tree-shaking
import { Switch } from "nextjs-darkmode/switch";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Core />
      <header>
        <Switch />
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

⚡🎉Boom! Just a couple of lines and your dark mode is ready, complete with a color switch for user preferences. Check out examples for advanced usage.

> For `vite` or any other build tool, find a similar root component, e.g., `<App />` in `CRA` and `vite`.

### With Next.js `app` router (Server Components)

Update `app/layout.jsx` to add `Core` and `ServerTarget` to avoid flash of un-themed content:

```tsx
// app/layout.jsx
import { Core } from "nextjs-darkmode"; // for better tree-shaking
import { ServerTarget } from "nextjs-darkmode/server";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ServerTarget />
        <Core />
        {children}
      </body>
    </html>
  );
}
```

If you prefer SSR over SSG for your entire app, you can wrap entire app with `ServerTarget` as follows:

```tsx
// app/layout.jsx
import { Core } from "nextjs-darkmode"; // for better tree-shaking
import { ServerTarget } from "nextjs-darkmode/server";

export default function Layout({ children }) {
  return (
    <ServerTarget tag="html" lang="en">
      <head />
      <body>
        <Core />
        {children}
      </body>
    </ServerTarget>
  );
}
```

### Switch

An elegant color switch to toggle color schemes:

```tsx
<Switch />
```

### HTML & CSS

Fully support dark mode, including system preference with `prefers-color-scheme`. The dark/light mode is synced between tabs and modifies the `className` and data-attributes on the `html` or ServerTarget element:

```css
:root {
  --background: white;
  --foreground: black;
}

.dark {
  --background: black;
  --foreground: white;
}

/* or */

[data-rm="dark"] {...}
```

When using `ServerTarget`, use the CSS general sibling combinator (~):

```css
.selector,
.selector *,
.selector ~ *,
.selector ~ * * {
  --th-variable: value;
}
```

#### Using the data-attributes

`data-rm` -> Resolved Mode

`data-m` -> User's preference

`data-sm` -> System preference

#### Content Security Policy

If you are using CSP rules for CSS files, you can pass `nonce` argument to the `Core` component. If `nonce` is not supplied transition styles will not be applied. This may allow patched transitions throught the page in some cases.

```tsx
<Core nonce={yourNonce} t="transition: all .5s" />
```

### Images

Show different images based on the current theme:

```jsx
import Image from "next/image";
import { useMode } from "nextjs-darkmode/hooks";

function ThemedImage() {
  const { resolvedMode } = useMode();
  let src;

  switch (resolvedMode) {
    case "light":
      src = "/light-mode-image.png";
      break;
    case "dark":
      src = "/dark-mode-image.png";
      break;
    default:
      src = "/default-image.png";
      break;
  }

  return <Image src={src} alt="Themed Image" />;
}
```

### useMode

The `useMode` hook provides mode information:

```js
import { useMode } from "nextjs-darkmode";

const ThemeChanger = () => {
  const { resolvedMode, setMode } = useMode();

  return (
    <div>
      The current resolved mode is: {resolvedMode}
      <button onClick={() => setMode("light")}>Light Mode</button>
      <button onClick={() => setMode("dark")}>Dark Mode</button>
    </div>
  );
};
```

`useMode` hook returns the following object:

```ts
export interface UseModeInterface {
  mode: ColorSchemePreference;
  systemMode: ResolvedScheme;
  resolvedMode: ResolvedScheme;
  setMode: (mode: ColorSchemePreference) => void;
}
```

### Force per page mode

Apply appropriate class names and data attributes to force a mode for the page:

```tsx
export default function Page() {
  return <div className="dark ndm-scoped data-rm='dark'">...</div>;
}
```

### With Styled Components and any CSS-in-JS

Next Themes works with any library. For example, with Styled Components:

```js
// pages/_app.js
import { createGlobalStyle } from "styled-components";
import { Core } from "nextjs-darkmode";

// Your theming variables
const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #000;
    --bg: #fff;
  }

  [data-rm="dark"] {
    --fg: #fff;
    --bg: #000;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Core />
      <Component {...pageProps} />
    </>
  );
}
```

### With Tailwind

In `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
};
```

Now you can use dark-mode specific classes:

```tsx
<h1 className="text-black dark:text-white">
```

> When you use Tailwind, make sure you replace `html` in `app/layout` to `<ServerTarget tag="html"...` to avoid FOUC.

## Performance

`nextjs-darkmode` is designed to be fully tree-shakable, including only the code you use. For instance, if you only use the `useMode` hook, the rest of the library's code will be removed during the build process.

## Contributing

We welcome contributions! Check out the [Contributing Guide](https://github.com/react18-tools/nextjs-darkmode/blob/main/CONTRIBUTING.md) for more details.

### 🤩 Don't forget to star [this repo](https://github.com/react18-tools/nextjs-darkmode)!

Explore hands-on courses to get started with Turborepo:

- [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript)
- [The Game of Chess with Next.js, React, and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/1de49d3f98af85faaf462974a990ac2f51d13041.svg "Repobeats analytics image")

## License

[MPL-2.0](https://github.com/react18-tools/nextjs-darkmode/blob/main/LICENSE)

Feel free to use, modify, and distribute this library under the MPL-2.0 license.

Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
