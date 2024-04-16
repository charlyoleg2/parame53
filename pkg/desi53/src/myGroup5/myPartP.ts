// myPartP.ts
// using functions for creating contours

// step-1 : import from geometrix
import type {
	tContour,
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
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'myPartP',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('A1', 'mm', 30, 10, 100, 1),
		pNumber('B1', 'mm', 30, 10, 100, 1),
		pNumber('C1', 'mm', 60, 10, 100, 1),
		pNumber('A2', 'mm', 60, 10, 100, 1),
		pNumber('B2', 'mm', 30, 10, 100, 1),
		pNumber('C2', 'mm', 30, 10, 100, 1),
		pNumber('A3', 'mm', 30, 10, 100, 1),
		pNumber('B3', 'mm', 60, 10, 100, 1),
		pNumber('C3', 'mm', 30, 10, 100, 1)
	],
	paramSvg: {
		A1: 'myPartP_face.svg',
		B1: 'myPartP_face.svg',
		C1: 'myPartP_face.svg',
		A2: 'myPartP_face.svg',
		B2: 'myPartP_face.svg',
		C2: 'myPartP_face.svg',
		A3: 'myPartP_face.svg',
		B3: 'myPartP_face.svg',
		C3: 'myPartP_face.svg'
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
		const heightMax = Math.max(param.A1 + param.B1, param.A2 + param.B2, param.A3 + param.B3);
		const stepMax = Math.max(param.A1, param.C1, param.A2, param.C2, param.A3, param.C3);
		const rectWith = 5 * stepMax;
		const rectHeight = 2 * heightMax;
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartP: rectangle ${ffix(rectWith)} x ${ffix(rectHeight)} mm\n`;
		// step-7 : drawing of the figures
		// function definition
		const ctrFunc = function (aA: number, aB: number, aC: number): tContour {
			const rCtr = contour(0, 0)
				.addSegStrokeA(aC, 0)
				.addSegStrokeA((2 * aC) / 3, aB)
				.addPointA(aC / 3, aB)
				.addSegArc(aA / 2, true, true)
				.closeSegStroke();
			return rCtr;
		};
		// fig1
		const ctrRect = contour(0, 0)
			.addSegStrokeA(rectWith, 0)
			.addSegStrokeA(rectWith, rectHeight)
			.addSegStrokeA(0, rectHeight)
			.closeSegStroke();
		fig1.addMain(ctrRect);
		fig1.addMain(ctrFunc(param.A1, param.B1, param.C1).translate(stepMax / 2, heightMax / 2));
		fig1.addMain(ctrFunc(param.A2, param.B2, param.C2).translate(2 * stepMax, heightMax / 2));
		fig1.addMain(ctrFunc(param.A3, param.B3, param.C3).translate(3.5 * stepMax, heightMax / 2));
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
		rGeome.logstr += 'myPartP drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartPDef: tPageDef = {
	pTitle: 'My Part-P',
	pDescription: 'Using a function for creating contours',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartPDef };
