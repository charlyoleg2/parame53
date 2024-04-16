// myPartR.ts
// 2D drawings only, without 3D export

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
	//ShapePoint,
	contour,
	//contourCircle,
	figure,
	degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	//EExtrude,
	//EBVolume,
	initGeom
} from 'geometrix';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'myPartR',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('P1', 'mm', 50, 10, 100, 1),
		pNumber('B1', 'mm', 90, 10, 200, 1),
		pNumber('H1', 'mm', 140, 80, 200, 1),
		pNumber('a1', 'degree', 20, 1, 45, 1),
		pNumber('M1', 'mm', 50, 10, 100, 1),
		pNumber('M2', 'mm', 10, 4, 100, 1),
		pNumber('C1', 'mm', 30, 10, 100, 1),
		pNumber('C2', 'mm', 20, 4, 100, 1),
		pNumber('S1', 'mm', 50, 10, 100, 1),
		pNumber('S2', 'mm', 25, 5, 100, 1),
		pNumber('S3', 'mm', 40, 5, 100, 1),
		pNumber('S4', 'mm', 28, 5, 100, 1)
	],
	paramSvg: {
		P1: 'myPartR_dress.svg',
		B1: 'myPartR_dress.svg',
		H1: 'myPartR_dress.svg',
		a1: 'myPartR_dress.svg',
		M1: 'myPartR_dress.svg',
		M2: 'myPartR_dress.svg',
		C1: 'myPartR_dress.svg',
		C2: 'myPartR_dress.svg',
		S1: 'myPartR_short.svg',
		S2: 'myPartR_short.svg',
		S3: 'myPartR_short.svg',
		S4: 'myPartR_short.svg'
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
	const figDress = figure();
	const figShort = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const a1b = Math.PI / 2 + degToRad(param.a1);
		const a1c = Math.PI / 2 - degToRad(param.a1);
		const a2b = degToRad(42);
		const a3b = degToRad(45);
		const h2b = param.H1 + 2.1 * param.M2;
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartR: dress ${ffix(param.H1)} x ${ffix(param.B1)} mm\n`;
		// step-7 : drawing of the figures
		// figDress
		const p1 = point(param.P1 / 2, param.H1).translatePolar(degToRad(75), 1.6 * param.M2);
		const p2a = point(-param.P1 / 2, param.H1);
		const p2 = p2a.translatePolar(degToRad(105), 1.6 * param.M2);
		const p2b = p2a.translatePolar(-Math.PI / 2 - a2b, param.M1);
		const p2c = p2b.translatePolar(Math.PI / 2 + a3b, param.M2);
		const ctrDress = contour(0, 0)
			.addSegStrokeA(param.B1 / 2, 0)
			.addPointA(param.P1 / 2, param.H1)
			.addSegArc3(a1b, true)
			.addSegStrokeRP(-a2b, param.M1)
			.addSegStrokeRP(a3b, param.M2)
			.addSegStrokeA(p1.cx, p1.cy)
			.addSegStrokeA(param.C1 / 2, h2b)
			.addSegStrokeA(param.C1 * 0.35, h2b - 0.7 * param.C2)
			.addSegStrokeA(0, h2b - param.C2)
			.addSegStrokeA(-param.C1 * 0.35, h2b - 0.7 * param.C2)
			.addSegStrokeA(-param.C1 / 2, h2b)
			.addSegStrokeA(p2.cx, p2.cy)
			.addSegStrokeA(p2c.cx, p2c.cy)
			.addSegStrokeA(p2b.cx, p2b.cy)
			.addSegStrokeA(p2a.cx, p2a.cy)
			.addSegStrokeA(-param.P1 / 2, param.H1)
			.addPointA(-param.B1 / 2, 0)
			.addSegArc3(a1c, false)
			.closeSegStroke();
		figDress.addMain(ctrDress);
		// figShort
		const sp1 = point(param.S1 / 2, 0);
		const sp2 = sp1.translatePolar(degToRad(-80), param.S3);
		const sp3 = sp2.translatePolar(degToRad(190), param.S4);
		const sp1b = point(-param.S1 / 2, 0);
		const sp2b = sp1b.translatePolar(degToRad(-100), param.S3);
		const sp3b = sp2b.translatePolar(degToRad(-10), param.S4);
		const ctrShort = contour(sp1.cx, sp1.cy)
			.addSegStrokeA(sp2.cx, sp2.cy)
			.addSegStrokeA(sp3.cx, sp3.cy)
			.addSegStrokeA(0, -param.S2)
			.addSegStrokeA(sp3b.cx, sp3b.cy)
			.addSegStrokeA(sp2b.cx, sp2b.cy)
			.addSegStrokeA(sp1b.cx, sp1b.cy)
			.closeSegStroke();
		figShort.addMain(ctrShort);
		// final figure list
		rGeome.fig = {
			faceDress: figDress,
			faceShort: figShort
		};
		// step-8 : recipes of the 3D construction
		//const designName = rGeome.partName;
		//rGeome.vol = {
		//	extrudes: [],
		//	volumes: []
		//};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartR drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartRDef: tPageDef = {
	pTitle: 'My Part-R',
	pDescription: '2D drawings only, without 3D export',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartRDef };
