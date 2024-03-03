// myPartS.ts
// a serie of blade profiles

// step-1 : import from geometrix
import type {
	tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tExtrude,
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
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartS',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('ai1', 'degree', -1, -90, 0, 1),
		pNumber('ai2', 'degree', -35, -90, 0, 1),
		pNumber('Li1', 'mm', 120, 10, 300, 1),
		pNumber('Li2', 'mm', 40, 10, 300, 1),
		pNumber('Ri1', 'mm', 150, 100, 2000, 1),
		pNumber('Ri2', 'mm', 1000, 100, 2000, 1),
		pNumber('Rai1', 'mm', 15, 1, 50, 1),
		pNumber('Rai2', 'mm', 8, 1, 50, 1),
		pNumber('Rqi1', 'mm', 4, 1, 30, 1),
		pNumber('Rqi2', 'mm', 4, 1, 30, 1),
		pNumber('He1', 'mm', 20, 1, 200, 1),
		pNumber('He2', 'mm', 10, 1, 200, 1),
		pNumber('Pe1', 'mm', 40, 1, 300, 1),
		pNumber('Pe2', 'mm', 25, 1, 300, 1),
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

// sub functions
function linear(start: number, stop: number, p01: number) {
	const rVal = start + (stop - start) * p01;
	return rVal;
}

function sqrt(start: number, stop: number, p01: number) {
	const rVal = start + (stop - start) * Math.sqrt(p01);
	return rVal;
}

function square(start: number, stop: number, p01: number) {
	const rVal = start + (stop - start) * p01 ** 2;
	return rVal;
}

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figFlat = figure();
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
		// figFlat
		const fCtrProfile = function (
			ai: number,
			Rai: number,
			Li: number,
			Ri: number,
			Rqi: number,
			He: number,
			Pe: number
		): tContour {
			const air = degToRad(ai);
			const p1 = point(0, 0);
			const p2 = point(Rai, -Rai);
			const intraAngle = Li / Ri;
			const pIntraCenter = p2.translate(0, -Ri);
			const p3 = p2.rotate(pIntraCenter, -intraAngle);
			const qAngle = Math.PI / 2 - intraAngle;
			const extraAngle = Math.atan2(He, Li - Pe);
			const extraAngle2 = Math.PI - intraAngle - extraAngle;
			const pQueueCenter = p3.translatePolar(qAngle, Rqi);
			//const p4 = p3.translatePolar(qAngle - Math.PI / 4, Rqi * Math.sqrt(2));
			const p4 = p3.rotate(pQueueCenter, Math.PI - extraAngle);
			const p6 = point(Pe, He);
			const ctrPHorizontal = contour(p1.cx, p1.cy)
				.addPointA(p2.cx, p2.cy)
				.addSegArc(Rai, false, true)
				.addPointA(p3.cx, p3.cy)
				.addSegArc(Ri, false, false)
				.addPointA(p4.cx, p4.cy)
				.addSegArc(Rqi, false, true)
				//.addSegStrokeA(p6.cx, p6.cy)
				.addPointA(p6.cx, p6.cy)
				.addSeg2Arcs(extraAngle2, 0)
				.addPointA(p1.cx, p1.cy)
				.addSeg2Arcs(Math.PI, Math.PI / 2);
			const rCtrP = ctrPHorizontal.rotate(0, 0, air);
			return rCtrP;
		};
		const oLen = { length: param.pN };
		const sai = Array.from(oLen, (_, idx) => linear(param.ai1, param.ai2, idx / param.pN));
		const sRai = Array.from(oLen, (_, idx) => linear(param.Rai1, param.Rai2, idx / param.pN));
		const sLi = Array.from(oLen, (_, idx) => square(param.Li1, param.Li2, idx / param.pN));
		const sRi = Array.from(oLen, (_, idx) => linear(param.Ri1, param.Ri2, idx / param.pN));
		const sRqi = Array.from(oLen, (_, idx) => linear(param.Rqi1, param.Rqi2, idx / param.pN));
		const sHe = Array.from(oLen, (_, idx) => sqrt(param.He1, param.He2, idx / param.pN));
		const sPe = Array.from(oLen, (_, idx) => sqrt(param.Pe1, param.Pe2, idx / param.pN));
		for (let i = 0; i < param.pN; i++) {
			figFlat.addMain(
				fCtrProfile(sai[i], sRai[i], sLi[i], sRi[i], sRqi[i], sHe[i], sPe[i]).translate(
					0,
					-i * param.Li1
				)
			);
		}
		// final figure list
		rGeome.fig = {
			flat: figFlat
		};
		// add each individual profile
		for (let i = 0; i < param.pN; i++) {
			const figI = figure();
			figI.addMain(fCtrProfile(sai[i], sRai[i], sLi[i], sRi[i], sRqi[i], sHe[i], sPe[i]));
			rGeome.fig[`prf${i.toString().padStart(2, '0')}`] = figI;
		}
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		// prepare list
		const sExtrude: tExtrude[] = [];
		const sName: string[] = [];
		for (let i = 0; i < param.pN; i++) {
			const oneName = `subpax_${designName}_prf${i.toString().padStart(2, '0')}`;
			const oneE: tExtrude = {
				outName: oneName,
				face: `${designName}_prf${i.toString().padStart(2, '0')}`,
				extrudeMethod: EExtrude.eLinearOrtho,
				length: 1,
				rotate: [0, 0, 0],
				translate: [0, 0, i * 20]
			};
			sExtrude.push(oneE);
			sName.push(oneName);
		}
		// final volume defintion
		rGeome.vol = {
			extrudes: sExtrude,
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: sName
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
