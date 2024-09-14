Parame53
========


Presentation
------------

*Parame53* is the top-monorepo for the design-libraresy *desi53* and *desi53b*, which contains a collection of 3D shapes.

This monorepo contains the following *javascript* package:

1. desi53: a *parametrix* design library
2. desi53b: an other *parametrix* design library
3. desi53-cli: the cli of desi53
4. desi53-ui: the web-ui of desi53
5. desi53-uis: the web-server of desi53-ui


This repo is a typical designer-repository using [parametrix](https://charlyoleg2.github.io/parametrix/).
The design-library and its associated UI and CLI are published as *npm-packages*.
The UI is also available on the github-page.

Those two design-libraries are part of the *parametrix* tutorial.


Links
-----

- [desi53-ui](https://charlyoleg2.github.io/parame53/) : public instance of the UI
- [sources](https://github.com/charlyoleg2/parame53) : git-repository
- [pkg](https://www.npmjs.com/package/desi53) : desi53 as npm-package
- [pkg-b](https://www.npmjs.com/package/desi53b) : desi53b as npm-package
- [pkg-cli](https://www.npmjs.com/package/desi53-cli) : desi53-cli as npm-package
- [pkg-uis](https://www.npmjs.com/package/desi53-uis) : desi53-uis as npm-package


Usage for Makers
----------------

Parametrize and generate your 3D-files with the online-app:

[https://charlyoleg2.github.io/parame53/](https://charlyoleg2.github.io/parame53/)

Or use the UI locally:

```bash
npx desi53-uis
```

Or use the command-line-interface (CLI):

```bash
npx desi53-cli
```

Getting started for Dev
-----------------------

```bash
git clone https://github.com/charlyoleg2/parame53
cd parame53
npm i
npm run ci
npm run preview
```

Other useful commands:
```bash
npm run clean
npm run ls-workspaces
npm -w desi53 run check
npm -w desi53 run build
npm -w desi53-ui run dev
```

Prerequisite
------------

- [node](https://nodejs.org) version 20.10.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 10.5.0 or higher


Publish a new release
---------------------

```bash
npm run versions
git commit -am 'increment sub versions'
npm version patch
git push
git push origin v0.5.6
```
