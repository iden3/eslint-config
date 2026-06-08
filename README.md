# Shared lint / format / spell config for iden3 JS & TS projects

Formatting and linting are handled by [Biome](https://biomejs.dev/), spell
checking by [cspell](https://cspell.org/). This replaces the previous
ESLint + Prettier + cspell-eslint-plugin stack: **one package to install, two
one-line config files, and a single gated CI command.**

A single package, `@iden3/biome-config`, ships both configs and pulls in both
engines (`@biomejs/biome` + `cspell`) as dependencies, so installing it is all a
consumer needs.

| Subpath export | What it provides | Replaces |
| --- | --- | --- |
| `@iden3/biome-config/biome` | Shared Biome formatter + linter config | `@iden3/eslint-config`, `@iden3/prettier-config` |
| `@iden3/biome-config/cspell` | Shared cspell dictionary (domain word list) | `@cspell/eslint-plugin` config block |

> The legacy `@iden3/eslint-config` and `@iden3/prettier-config` packages remain
> published on npm for projects that have not migrated yet.

## Integrate into a project

### 1. Install (one package)

```sh
# npm
npm i -D @iden3/biome-config

# yarn
yarn add -D @iden3/biome-config

# pnpm — see the note at the bottom about hoisting
pnpm add -D @iden3/biome-config
```

This brings the `biome` and `cspell` binaries with it; no separate engine
installs needed.

### 2. Add `biome.json`

The `extends` entry is the package name + the `/biome` **exports key** — it is
resolved through `node_modules`, not as a file path.

```json
{
  "$schema": "https://biomejs.dev/schemas/2.4.16/schema.json",
  "extends": ["@iden3/biome-config/biome"]
}
```

Project-specific overrides go right below `extends`.

### 3. Add `cspell.json`

`import` pulls in the shared dictionary via the `/cspell` exports key; add
project-specific terms in `words`.

```json
{
  "version": "0.2",
  "import": ["@iden3/biome-config/cspell"],
  "words": ["myProjectTerm"]
}
```

### 4. Add scripts

```json
{
  "scripts": {
    "format": "biome format --write .",
    "check": "biome check --write .",
    "lint": "biome ci . && cspell \"**/*.{ts,js,mjs}\" --no-progress"
  }
}
```

- `format` — rewrite files with the shared formatter.
- `check` — autofix formatter + safe lint fixes (local use).
- `lint` — **the CI gate**: `biome ci` is read-only and exits non-zero on any
  lint/format error; `cspell` exits non-zero on any unknown word. If either
  fails, the command fails.

### 5. Gate CI

```yaml
# .github/workflows/lint.yml
name: lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx biome ci .
      - run: npx cspell "**/*.{ts,js,mjs}" --no-progress
```

Running the two tools as **separate steps** keeps failures isolated in the CI
UI (a formatting failure and a spelling failure show up distinctly).

## Editor integration

- **Biome** extension (VS Code / JetBrains) reads `biome.json` automatically —
  format-on-save and inline lint.
- **Code Spell Checker** extension reads `cspell.json` automatically — the
  shared dictionary is already imported.

## Notes

- **Spell-check now gates CI.** The old `@cspell/eslint-plugin` ran at warning
  level, so spelling issues did **not** fail CI. The standalone `cspell` CLI
  exits non-zero on any unknown word, so spelling now gates CI by default. Add
  real terms to your project's `words` list, or open a PR here for terms shared
  across iden3 projects.
- **pnpm users:** the `biome`/`cspell` binaries arrive as transitive
  dependencies. With npm and Yarn this hoists fine. Under pnpm's strict
  `node_modules`, transitive binaries are not exposed by default — either set
  `node-linker=hoisted` / `shamefully-hoist=true`, or add `@biomejs/biome` and
  `cspell` as direct devDependencies.
