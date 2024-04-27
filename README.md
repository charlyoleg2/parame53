Parame53
========


Presentation
------------

*Parame53* is the top-monorepo of the design-libraries *desi53* ans *desi53b*.
Those two design-libraries are part of the *parametrix* tutorial.

This repo is a designer-repository using [parametrix](https://charlyoleg2.github.io/parametrix/).
The file structure of *parame53* can be used as template for creating other *design-libraries*.
In particular, if you want to create several *design-libraries* in one mono-repository.

This monorepo contains two *javascript* packages:

1. desi53: a library of 3D-parts using *geometrix*
2. desi53b: an other library of 3D-parts using *geometrix*

The *UI* and *Cli* apps are generated automatically with [paxApps](https://github.com/charlyoleg2/parame_paxApps).

A public instance of *desiXY-ui* is available on that [github-page](https://charlyoleg2.github.io/parame53/).
The *code source* is available on [github](https://github.com/charlyoleg2/parame53).


Links
-----

- [desi53-ui](https://charlyoleg2.github.io/parame53/) : public instance of the UI
- [sources](https://github.com/charlyoleg2/parame53) : git-repository
- [desi53-pkg](https://www.npmjs.com/package/desi53) : desi53 as npm-package
- [desi53b-pkg](https://www.npmjs.com/package/desi53b) : desi53b as npm-package


Prerequisite
------------

- [node](https://nodejs.org) version 20.10.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 10.5.0 or higher


Getting started
---------------

```bash
git clone https://github.com/charlyoleg2/parame53
cd parame53
npm i
npm run clean_paxApps
npm run install_paxApps
rm -fr node_modules
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
npm -w desiXY-ui run dev
```

Publish a new release
---------------------

```bash
npm run versions
vim scr/patchPaxApps.patch
git diff
git commit -am 'increment sub versions'
npm version patch
git push
git push origin v0.5.6
```
