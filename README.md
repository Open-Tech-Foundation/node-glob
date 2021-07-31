# @open-tech-world/node-glob

> Match files & directories using [glob](https://en.wikipedia.org/wiki/Glob_(programming)) patterns.

It uses [@open-tech-worl/es-glob](https://github.com/open-tech-world/es-glob) for path matching.

See the list of available glob patterns [here](https://github.com/open-tech-world/es-glob#supported-glob-patterns).

## Features

✔️ Sync matching

🚧 ASync matching

✔️ Supports multiple patterns

## Installation

Using npm

```shell
npm install @open-tech-world/node-glob
```

Using Yarn

```shell
yarn add @open-tech-world/node-glob
```

## Usage

```ts
import nodeGlob from '@open-tech-world/node-glob';

nodeGlob(patterns: string | string[], options: IOptions): string[];
```

### Options

| Name | Type | Default | Description |
|------|------|---------|------|
| cwd  | string \| undefined | process.cwd() | The current working directory in which to search files & folders.|

## Examples

```shell
my-app/
├─ node_modules/
├─ public/
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ robots.txt
├─ src/
│  ├─ index.css
│  ├─ index.js
├─ .gitignore
├─ package.json
├─ README.md
```
```ts
import nodeGlob from '@open-tech-world/node-glob';

nodeGlob(['*']) // ['node_modules', 'public', 'src', 'package.json', 'README.md']

nodeGlob(['*', '!node_modules']) // ['public', 'src', 'package.json', 'README.md']

nodeGlob(['*.json']) // ['package.json']

nodeGlob(['src/index.*']) // ['src/index.css', 'src/index.js']

nodeGlob(['**/index.[a-j]*']) // ['src/index.css', 'src/index.js']
```

## License

Copyright (c) 2021, [Thanga Ganapathy](https://thanga-ganapathy.github.io) ([MIT License](./LICENSE)).
