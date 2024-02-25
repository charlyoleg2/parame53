Parame53
========


Presentation
------------

*Parame53* constains the *geometrix design* library *desi53*, which  belongs to the *parametrix* tutorial. The file structure of *parame53* can be used as template for creating other *geometrix design libraries*.

This is the monorepo that contains two *javascript* packages:

1. desi53: a library of 3D-parts using *geometrix*
1. desi54: an other library of 3D-parts using *geometrix*

The *UI* and *Cli* apps are generated automatically within *paxApps*.

A public instance of *desiXY-ui* is available on that [github-page](https://charlyoleg2.github.io/parame53/).
The *code source* is available on [github](https://github.com/charlyoleg2/parame53).


Prerequisite
------------

- [node](https://nodejs.org) version 20.10.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 10.2.4 or higher


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


