// myPartO.ts
// a bubble to illustrate the double-arcs

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
	degToRad,
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
	partName: 'myPartO',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 40, 1, 200, 1),
		pNumber('P1X', 'mm', 0, -50, 200, 1),
		pNumber('P1Y', 'mm', 30, 1, 200, 1),
		pNumber('P2X', 'mm', 40, 1, 200, 1),
		pNumber('P2Y', 'mm', 30, 1, 200, 1),
		pNumber('A1', 'degree', 60, -30, 210, 1),
		pNumber('A2', 'degree', 120, -30, 210, 1)
	],
	paramSvg: {
		L1: 'myPartO_face.svg',
		P1X: 'myPartO_face.svg',
		P1Y: 'myPartO_face.svg',
		P2X: 'myPartO_face.svg',
		P2Y: 'myPartO_face.svg',
		A1: 'myPartO_face.svg',
		A2: 'myPartO_face.svg'
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
		const a1 = degToRad(param.A1);
		const a2 = degToRad(param.A2);
		const Lmax = Math.max(param.L1, param.P2X) - Math.min(0, param.P1X);
		// step-5 : checks on the parameter values
		if (param.P1X > param.P2X) {
			throw `err791: P1X ${param.P1X} is too large compare to P2X ${param.P2X}`;
		}
		// step-6 : any logs
		rGeome.logstr += `myPartO: Lmax ${ffix(Lmax)} mm\n`;
		// step-7 : drawing of the figures
		// fig1
		const p1 = point(param.P1X, param.P1Y, ShapePoint.eBigSquare);
		const p2 = point(param.P2X, param.P2Y, ShapePoint.eBigSquare);
		fig1.addPoint(p1);
		fig1.addPoint(p2);
		const ctrBubble = contour(0, 0)
			.addSegStrokeA(param.L1, 0)
			.addPointA(p2.cx, p2.cy)
			.addSegArc3(Math.PI + a2, false)
			.addPointA(p1.cx, p1.cy)
			.addSeg2Arcs(a2, a1)
			.addPointA(0, 0)
			.addSegArc3(Math.PI + a1, true);
		//ctrBubble.closeSegStroke();
		fig1.addMain(ctrBubble);
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
		rGeome.logstr += 'myPartO drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartODef: tPageDef = {
	pTitle: 'My Part-O',
	pDescription: 'A bubble for illustration double-arcs',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartODef };
