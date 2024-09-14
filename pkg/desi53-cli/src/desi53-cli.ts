#!/usr/bin/env node
// desi53-cli.ts

import { geom_cli } from 'geomcli';
import packag from '../package.json';
import { designList } from './designList';

//console.log('desi53-cli says hello');
await geom_cli(process.argv, designList, packag, 'output');
//console.log('desi53-cli says bye');
