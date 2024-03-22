// myPartW.ts
// illustrating transform3d for positioning extrusion in the 3D-space

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
	//designParam,
	//checkGeom,
	//prefixLog,
	//point,
	//ShapePoint,
	contour,
	//contourCircle,
	figure,
	//degToRad,
	radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartW',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('W1', 'mm', 10, 1, 50, 0.1),
		pNumber('T1', 'mm', 15, 1, 50, 0.1),
		pNumber('E1', 'mm', 0.2, 0.05, 0.5, 0.01),
		pSectionSeparator('roof'),
		pNumber('L1', 'mm', 1, 0, 2, 0.1),
		pNumber('L2', 'mm', 1, 0, 2, 0.1),
		pNumber('H1', 'mm', 4, 1, 10, 0.1),
		pNumber('H2', 'mm', 4, 1, 10, 0.1),
		pNumber('E2', 'mm', 0.2, 0.05, 0.5, 0.01)
	],
	paramSvg: {
		W1: 'myPartW_top.svg',
		T1: 'myPartW_top.svg',
		E1: 'myPartW_top.svg',
		L1: 'myPartW_top.svg',
		L2: 'myPartW_top.svg',
		H1: 'myPartW_face.svg',
		H2: 'myPartW_face.svg',
		E2: 'myPartW_face.svg'
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
	const figTop = figure();
	const figFace = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const roof_angle = Math.atan2(param.H2, param.W1 / 2);
		const roofV = param.E2 / Math.cos(roof_angle);
		//const roofH = param.E2 / Math.sin(roof_angle);
		const roofEndH = Math.cos(Math.PI / 2 - roof_angle) * param.E2;
		const roofPlusH = param.L1 - roofEndH;
		const roofPlusV = roofPlusH * Math.tan(roof_angle);
		const roofPlusLength = Math.sqrt(roofPlusH ** 2 + roofPlusV ** 2);
		const roofInnerLength = Math.sqrt(param.H2 ** 2 + (param.W1 / 2) ** 2);
		const roofTopLength = Math.sqrt(roofV ** 2 - param.E2 ** 2);
		const roofLength = roofTopLength + roofInnerLength + roofPlusLength;
		// step-5 : checks on the parameter values
		if (2 * param.E1 > param.W1) {
			throw `err295: E1 ${param.E1} is too large compare to W1 ${param.W1}`;
		}
		if (param.E1 > param.T1) {
			throw `err296: E1 ${param.E1} is too large compare to T1 ${param.T1}`;
		}
		if (roofPlusH < 0) {
			throw `err297: L1 ${param.L1} is too small compare to roof_angle ${ffix(radToDeg(roof_angle))} and E2 ${param.E2}`;
		}
		// step-6 : any logs
		rGeome.logstr += `myPartW: height ${ffix(param.H1 + param.H2)} m\n`;
		rGeome.logstr += `myPartW: roof-angle ${ffix(radToDeg(roof_angle))} degree\n`;
		rGeome.logstr += `myPartW: one-side roof-length ${ffix(roofLength)} m\n`;
		// step-7 : drawing of the figures
		const ctrRect = function (ox: number, oy: number, lx: number, ly: number): tContour {
			const rCtr = contour(ox, oy)
				.addSegStrokeR(lx, 0)
				.addSegStrokeR(0, ly)
				.addSegStrokeR(-lx, 0)
				.closeSegStroke();
			return rCtr;
		};
		// figTop
		figTop.addMain(ctrRect(-param.W1 / 2, 0, param.W1, param.T1));
		figTop.addMain(
			ctrRect(
				-param.W1 / 2 + param.E1,
				param.E1,
				param.W1 - 2 * param.E1,
				param.T1 - 2 * param.E1
			)
		);
		figTop.addSecond(
			ctrRect(
				-param.W1 / 2 - param.L1,
				-param.L2,
				param.W1 / 2 + param.L1,
				param.T1 + 2 * param.L2
			)
		);
		figTop.addSecond(ctrRect(0, -param.L2, param.W1 / 2 + param.L1, param.T1 + 2 * param.L2));
		// figFace
		const ctrRoof = contour(-param.W1 / 2 - roofPlusH, param.H1 - roofPlusV)
			.addSegStrokeA(0, param.H1 + param.H2)
			.addSegStrokeA(param.W1 / 2 + roofPlusH, param.H1 - roofPlusV)
			.addSegStrokeRP(Math.PI / 2 - roof_angle, param.E2)
			.addSegStrokeA(0, param.H1 + param.H2 + roofV)
			.addSegStrokeRP(Math.PI + roof_angle, roofLength)
			.closeSegStroke();
		figFace.addMain(ctrRoof);
		figFace.addSecond(ctrRect(-param.W1 / 2, 0, param.W1, param.H1));
		// final figure list
		rGeome.fig = {
			faceTop: figTop,
			faceFace: figFace
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_wall`,
					face: `${designName}_faceTop`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_roof`,
					face: `${designName}_faceFace`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.T1 + 2 * param.L2,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_wall`, `subpax_${designName}_roof`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartW drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartWDef: tPageDef = {
	pTitle: 'My Part-W',
	pDescription: 'illustrating transform3d for positioning extrusion in the 3D-space',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartWDef };
