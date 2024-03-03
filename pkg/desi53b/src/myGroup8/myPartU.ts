// myPartU.ts
// an assembly of external design

// step-1 : import from geometrix
import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	//tExtrude,
	tPageDef
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	designParam,
	checkGeom,
	prefixLog,
	//point,
	//ShapePoint,
	//contour,
	//contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	//EExtrude,
	EBVolume
} from 'geometrix';

// external design import
import { myPartADef } from 'desi51';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartU',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 60, 1, 200, 1),
		pNumber('D2', 'mm', 30, 1, 200, 1),
		pNumber('E1', 'mm', 5, 1, 200, 1),
		pNumber('L1', 'mm', 40, 1, 200, 1)
	],
	paramSvg: {
		D1: 'myPartU_side.svg',
		D2: 'myPartU_side.svg',
		E1: 'myPartU_section.svg',
		L1: 'myPartU_section.svg'
	},
	sim: {
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figSide = figure();
	const figSection = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		// step-5 : checks on the parameter values
		if (param.E1 > param.D1 / 2) {
			throw `err395: E1 ${param.E1} is too large compare to D1 ${param.D1}`;
		}
		if (param.E1 > param.D2 / 2) {
			throw `err396: E1 ${param.E1} is too large compare to D2 ${param.D2}`;
		}
		// step-6 : any logs
		rGeome.logstr += `myPartU: Length ${ffix(5 * param.L1)}  Dmax ${ffix(Math.max(param.D1, param.D2))} mm\n`;
		// step-7 : drawing of the figures
		// step-7a : sub-design
		// myPartA-1
		const paramA1 = designParam(myPartADef.pDef, 'ref1');
		paramA1.setVal('D1', param.D1);
		paramA1.setVal('E1', param.E1);
		paramA1.setVal('L1', param.L1);
		const geomA1 = myPartADef.pGeom(0, paramA1.getParamVal(), paramA1.getSuffix());
		checkGeom(geomA1);
		rGeome.logstr += prefixLog(geomA1.logstr, paramA1.getPartNameSuffix());
		// myPartA-2
		const paramA2 = designParam(myPartADef.pDef, 'ref2');
		paramA2.setVal('D1', param.D2);
		paramA2.setVal('E1', param.E1);
		paramA2.setVal('L1', param.L1);
		const geomA2 = myPartADef.pGeom(0, paramA2.getParamVal(), paramA2.getSuffix());
		checkGeom(geomA2);
		rGeome.logstr += prefixLog(geomA2.logstr, paramA2.getPartNameSuffix());
		// step-7b : drawing of the figures
		figSide.mergeFigure(geomA1.fig.faceSide.translate(0, 2 * param.L1));
		figSide.mergeFigure(geomA2.fig.faceSide.translate(0, 0 * param.L1));
		figSide.mergeFigure(geomA2.fig.faceSide.translate(0, 4 * param.L1));
		figSection.mergeFigure(geomA1.fig.faceSection);
		figSection.mergeFigure(geomA2.fig.faceSection);
		// final figure list
		rGeome.fig = {
			faceSide: figSide,
			faceSection: figSection
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			inherits: [
				{
					outName: `inpax_${designName}_A1`,
					subdesign: 'pax_myPartAref1',
					subgeom: geomA1,
					rotate: [0, 0, 0],
					translate: [0, 0, 2 * param.L1]
				},
				{
					outName: `inpax_${designName}_A21`,
					subdesign: 'pax_myPartAref2',
					subgeom: geomA2,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `inpax_${designName}_A22`,
					subdesign: 'pax_myPartAref2',
					subgeom: geomA2,
					rotate: [0, 0, 0],
					translate: [0, 0, 4 * param.L1]
				}
			],
			extrudes: [],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`inpax_${designName}_A1`,
						`inpax_${designName}_A21`,
						`inpax_${designName}_A22`
					]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartU drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartUDef: tPageDef = {
	pTitle: 'My Part-U',
	pDescription: 'an assembly of external design',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartUDef };
