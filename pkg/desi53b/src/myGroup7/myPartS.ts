// myPartS.ts
// a serie of blade profiles

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
	point,
	ShapePoint,
	contour,
	//contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartS',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('ai1', 'degree', -20, -90, 0, 1),
		pNumber('ai2', 'degree', -20, -90, 0, 1),
		pNumber('Li1', 'mm', 120, 10, 300, 1),
		pNumber('Li2', 'mm', 120, 10, 300, 1),
		pNumber('Ri1', 'mm', 1000, 500, 2000, 1),
		pNumber('Ri2', 'mm', 1000, 500, 2000, 1),
		pNumber('Rai1', 'mm', 20, 1, 50, 1),
		pNumber('Rai2', 'mm', 20, 1, 50, 1),
		pNumber('Rqi1', 'mm', 4, 1, 30, 1),
		pNumber('Rqi2', 'mm', 4, 1, 30, 1),
		pNumber('He1', 'mm', 40, 1, 200, 1),
		pNumber('He2', 'mm', 40, 1, 200, 1),
		pNumber('Pe1', 'mm', 50, 1, 300, 1),
		pNumber('Pe2', 'mm', 50, 1, 300, 1),
		pNumber('pN', 'profiles', 10, 1, 20, 1)
	],
	paramSvg: {
		ai1: 'myPartS_profile.svg',
		ai2: 'myPartS_profile.svg',
		Li1: 'myPartS_profile.svg',
		Li2: 'myPartS_profile.svg',
		Ri1: 'myPartS_profile.svg',
		Ri2: 'myPartS_profile.svg',
		Rai1: 'myPartS_profile.svg',
		Rai2: 'myPartS_profile.svg',
		Rqi1: 'myPartS_profile.svg',
		Rqi2: 'myPartS_profile.svg',
		He1: 'myPartS_profile.svg',
		He2: 'myPartS_profile.svg',
		Pe1: 'myPartS_profile.svg',
		Pe2: 'myPartS_profile.svg',
		pN: 'myPartS_profile.svg'
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
	const fig1 = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		// step-5 : checks on the parameter values
		if (param.Rai1 > param.He1) {
			throw `err795: Rai1 ${param.Rai1} is too large compare to He1 ${param.He1}`;
		}
		if (param.ai1 < param.ai2) {
			throw `err796: ai1 ${param.ai1} is too negative compare to ai2 ${param.ai2}`;
		}
		// step-6 : any logs
		rGeome.logstr += `myPartS: Li1 ${ffix(param.Li1)}  Li2 ${ffix(param.Li2)} mm\n`;
		// step-7 : drawing of the figures
		// fig1
		const p1 = point(param.Pe1, param.He1, ShapePoint.eBigSquare);
		const p2 = point(param.Pe2, param.He2, ShapePoint.eBigSquare);
		fig1.addPoint(p1);
		fig1.addPoint(p2);
		const ctrProfile1 = contour(0, 0)
			.addSegStrokeA(param.Li1, 0)
			.addPointA(p2.cx, p2.cy)
			.addSegArc(param.Ri1, false, false)
			.closeSegStroke();
		fig1.addMain(ctrProfile1);
		// final figure list
		rGeome.fig = {
			profile1: fig1
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}`,
					face: `${designName}_profile1`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartS drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartSDef: tPageDef = {
	pTitle: 'My Part-S',
	pDescription: 'a serie of blade profiles',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartSDef };
