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
	point,
	ShapePoint,
	vector,
	line,
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
		pNumber('D1', 'mm', 30, 10, 100, 1),
		pNumber('R2', 'mm', 2, 1, 20, 1)
	],
	paramSvg: {
		D1: 'myPartQ_face.svg',
		R2: 'myPartQ_face.svg'
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
		const x2l = R1 * Math.cos(a2);
		const x2 = R1 + x2l;
		const x3 = (0 + x2) / 2;
		const y3 = Math.sqrt(R1 ** 2 - x3 ** 2);
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartQ: amplitude ${ffix(R1)} mm\n`;
		// step-7 : drawing of the figures
		// function definition
		// fig1
		const ctrLosange = contour(R1, 0)
			.addCornerRounded(param.R2)
			.addSegStrokeA(0, R1)
			.addCornerRounded(param.R2)
			.addSegStrokeA(-R1, 0)
			.addCornerRounded(param.R2)
			.addSegStrokeA(0, -R1)
			.addCornerRounded(param.R2)
			.closeSegStroke();
		fig1.addMain(contourCircle(0, 0, R1));
		fig1.addMain(ctrLosange);
		// second contours
		fig1.addSecond(contourCircle(x2, 0, R1));
		fig1.addSecond(ctrLosange.translate(x2, 0));
		// dynamics contours
		const ctrTriangle = contour(0, 0)
			.addSegStrokeA(x3, 0)
			.addSegStrokeA(x3, y3)
			.closeSegStroke();
		fig1.addDynamics(ctrTriangle);
		const ctrTriangle2 = contour(0, 0, 'blue')
			.addSegStrokeA(-x3, 0)
			.addSegStrokeA(-x3, -y3)
			.closeSegStroke();
		fig1.addDynamics(ctrTriangle2);
		// points
		const p0 = point(R1, 0, ShapePoint.eBigSquare);
		const p1 = point(x3, 0, ShapePoint.eTwoTri);
		const p2 = point(x3, -y3, ShapePoint.eTri1);
		const p3 = point(-x3, -y3, ShapePoint.eTri2);
		const p4 = point(-x3, y3, ShapePoint.eTri3);
		fig1.addPoint(p1);
		fig1.addPoint(p2);
		fig1.addPoint(p3);
		fig1.addPoint(p4);
		// vectors
		const va1 = a2;
		let vl3 = 2 * R1;
		if (va1 > 0) {
			const va2 = Math.asin((Math.sin(va1) * x2l) / R1); // law of sinus
			const va3 = Math.PI - (va1 + va2); // sum of angles of trangles
			vl3 = Math.sqrt(x2l ** 2 + R1 ** 2 - 2 * x2l * R1 * Math.cos(va3)); // law of cosinus
		}
		const vec1 = vector(a2, vl3, p0);
		fig1.addVector(vec1);
		// lines
		const line1 = line(-R1, 0, a2);
		fig1.addLine(line1);
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
