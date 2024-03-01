// myPartQ.ts
// using extra layers like vector and dynamics

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
	//point,
	//ShapePoint,
	contour,
	contourCircle,
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
	partName: 'myPartQ',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 30, 10, 100, 1)
	],
	paramSvg: {
		D1: 'myPartQ_face.svg'
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
		const R1 = param.D1 / 2;
		const a2 = (t * 2 * Math.PI) / 100;
		const x2 = R1 + R1 * Math.cos(a2);
		const x3 = (0 + x2) / 2;
		const y3 = Math.sqrt(R1 ** 2 - x3 ** 2);
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartQ: amplitude ${ffix(R1)} mm\n`;
		// step-7 : drawing of the figures
		// function definition
		// fig1
		fig1.addMain(contourCircle(0, 0, R1));
		fig1.addSecond(contourCircle(x2, 0, R1));
		const ctrTriangle = contour(0, 0)
			.addSegStrokeA(x3, 0)
			.addSegStrokeA(x3, y3)
			.closeSegStroke();
		fig1.addDynamics(ctrTriangle);
		// final figure list
		rGeome.fig = {
			face1: fig1
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}`,
					face: `${designName}_face1`,
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
		rGeome.logstr += 'myPartQ drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartQDef: tPageDef = {
	pTitle: 'My Part-Q',
	pDescription: 'Using extra layers like vectors and dynamics',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartQDef };
