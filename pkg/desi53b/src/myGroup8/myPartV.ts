// myPartV.ts

//export { myPartKDef as myPartVDef } from 'desi51'; // re-export external design
// or
import { myPartKDef as myPartVDef } from 'desi51';
myPartVDef.pTitle = 'my Part-V';
myPartVDef.pDescription = 'a re-export of myPartKDef with few modifications';
myPartVDef.pDef.partName = 'myPartV'; // if this design is not re-used, the partName can be overwritten
export { myPartVDef };
