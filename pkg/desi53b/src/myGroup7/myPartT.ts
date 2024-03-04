// myPartT.ts

//export { myPartADef as myPartTDef } from 'desi51'; // re-export external design
// or
import { myPartADef as myPartTDef } from 'desi51';
myPartTDef.pTitle = 'my Part-T';
myPartTDef.pDescription = 'a re-export of myPartADef with few modifications';
//myPartTDef.pDef.partName = 'myPartT'; // Overwrite partName works but has consequences
export { myPartTDef };
