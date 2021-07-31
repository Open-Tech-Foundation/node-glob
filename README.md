<div align="center">

# @open-tech-world/node-glob
[![Linux Build](https://github.com/open-tech-world/node-glob/actions/workflows/linux_build.yml/badge.svg)](https://github.com/open-tech-world/node-glob/actions/workflows/linux_build.yml) [![Windows Build](https://github.com/open-tech-world/node-glob/actions/workflows/windows_build.yml/badge.svg)](https://github.com/open-tech-world/node-glob/actions/workflows/windows_build.yml) [![macOS Build](https://github.com/open-tech-world/node-glob/actions/workflows/macos_build.yml/badge.svg)](https://github.com/open-tech-world/node-glob/actions/workflows/macos_build.yml) [![CodeFactor](https://www.codefactor.io/repository/github/open-tech-world/node-glob/badge)](https://www.codefactor.io/repository/github/open-tech-world/node-glob) ![npm](https://img.shields.io/npm/v/@open-tech-world/node-glob?color=blue)
</div>

> Match files & directories using [glob](https://en.wikipedia.org/wiki/Glob_(programming)) patterns.

It uses [@open-tech-worl/es-glob](https://github.com/open-tech-world/es-glob) for matching paths.

See the list of supported glob patterns [here](https://github.com/open-tech-world/es-glob#supported-glob-patterns).

## Features

✔️ Sync Matching API

🚧 Async Matching API

✔️ Supports Multiple Patterns

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
import { globSync } from '@open-tech-world/node-glob';

globSync(patterns: string | string[], options: IOptions): string[];
```

### Options

| Name | Type | Default | Description |
|------|------|---------|------|
| cwd  | string | process.cwd() | The current working directory in which to search files & folders.|
| dot  | boolean | false | If true, it matches files & directories that begin with a `"."`(dot) character.|

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
import { globSync } from '@open-tech-world/node-glob';

globSync(['*']) // ['node_modules', 'public', 'src', 'package.json', 'README.md']

globSync(['*'], { dot: true }) // ['node_modules', 'public', 'src', '.gitignore', 'package.json', 'README.md']

globSync(['*', '!node_modules']) // ['public', 'src', 'package.json', 'README.md']

globSync(['*.json']) // ['package.json']

globSync(['src/index.*']) // ['src/index.css', 'src/index.js']

globSync(['**/index.[a-j]*']) // ['src/index.css', 'src/index.js']

globSync(['public/*.(html|ico)']) // ['public/index.html', 'public/favicon.ico']
```

## License

Copyright (c) 2021, [Thanga Ganapathy](https://thanga-ganapathy.github.io) ([MIT License](./LICENSE)).
