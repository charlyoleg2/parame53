import{p as o,a as w,d as L,f as x,b as N,c as v,g as $,h as T,S as I,v as ue,l as ye,E,j as H,k as q,m as ee,n as De,o as F,q as G,r as W,t as _e,u as C,w as j,x as he}from"./CJdL4Eqw.js";var te={partName:"myPartO",params:[o("L1","mm",40,1,200,1),o("P1X","mm",0,-50,200,1),o("P1Y","mm",30,1,200,1),o("P2X","mm",40,1,200,1),o("P2Y","mm",30,1,200,1),o("A1","degree",60,-30,210,1),o("A2","degree",120,-30,210,1)],paramSvg:{L1:"myPartO_face.svg",P1X:"myPartO_face.svg",P1Y:"myPartO_face.svg",P2X:"myPartO_face.svg",P2Y:"myPartO_face.svg",A1:"myPartO_face.svg",A2:"myPartO_face.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function xe(l,e,P=""){const t=w(te.partName+P),n=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const r=L(e.A1),s=L(e.A2),d=Math.max(e.L1,e.P2X)-Math.min(0,e.P1X);if(e.P1X>e.P2X)throw`err791: P1X ${e.P1X} is too large compare to P2X ${e.P2X}`;t.logstr+=`myPartO: Lmax ${x(d)} mm
`;const g=N(e.P1X,e.P1Y,I.eBigSquare),a=N(e.P2X,e.P2Y,I.eBigSquare);n.addPoint(g),n.addPoint(a);const m=v(0,0).addSegStrokeA(e.L1,0).addPointA(a.cx,a.cy).addSegArc3(Math.PI+s,!1).addPointA(g.cx,g.cy).addSeg2Arcs(s,r).addPointA(0,0).addSegArc3(Math.PI+r,!0);n.addMainO(m),t.fig={face1:n};const f=t.partName;t.vol={extrudes:[{outName:`subpax_${f}`,face:`${f}_face1`,extrudeMethod:H.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${f}`,boolMethod:E.eIdentity,inList:[`subpax_${f}`]}]},t.sub={},t.logstr+=`myPartO drawn successfully!
`,t.calcErr=!1}catch(r){t.logstr+=r,console.log(r)}return t}var $e={pTitle:"My Part-O",pDescription:"A bubble for illustration double-arcs",pDef:te,pGeom:xe},oe={partName:"myPartP",params:[o("A1","mm",30,10,100,1),o("B1","mm",30,10,100,1),o("C1","mm",60,10,100,1),o("A2","mm",60,10,100,1),o("B2","mm",30,10,100,1),o("C2","mm",30,10,100,1),o("A3","mm",30,10,100,1),o("B3","mm",60,10,100,1),o("C3","mm",30,10,100,1)],paramSvg:{A1:"myPartP_face.svg",B1:"myPartP_face.svg",C1:"myPartP_face.svg",A2:"myPartP_face.svg",B2:"myPartP_face.svg",C2:"myPartP_face.svg",A3:"myPartP_face.svg",B3:"myPartP_face.svg",C3:"myPartP_face.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function Ae(l,e,P=""){const t=w(oe.partName+P),n=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const r=Math.max(e.A1+e.B1,e.A2+e.B2,e.A3+e.B3),s=Math.max(e.A1,e.C1,e.A2,e.C2,e.A3,e.C3),d=5*s,g=2*r;t.logstr+=`myPartP: rectangle ${x(d)} x ${x(g)} mm
`;const a=function(_,y,D){return v(0,0).addSegStrokeA(D,0).addSegStrokeA(2*D/3,y).addPointA(D/3,y).addSegArc(_/2,!0,!0).closeSegStroke()},m=v(0,0).addSegStrokeA(d,0).addSegStrokeA(d,g).addSegStrokeA(0,g).closeSegStroke();n.addMainO(m),n.addMainO(a(e.A1,e.B1,e.C1).translate(s/2,r/2)),n.addMainO(a(e.A2,e.B2,e.C2).translate(2*s,r/2)),n.addMainO(a(e.A3,e.B3,e.C3).translate(3.5*s,r/2)),t.fig={face1:n};const f=t.partName;t.vol={extrudes:[{outName:`subpax_${f}`,face:`${f}_face1`,extrudeMethod:H.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${f}`,boolMethod:E.eIdentity,inList:[`subpax_${f}`]}]},t.sub={},t.logstr+=`myPartP drawn successfully!
`,t.calcErr=!1}catch(r){t.logstr+=r,console.log(r)}return t}var ve={pTitle:"My Part-P",pDescription:"Using a function for creating contours",pDef:oe,pGeom:Ae},se={partName:"myPartQ",params:[o("D1","mm",30,10,100,1),o("R2","mm",2,1,20,1)],paramSvg:{D1:"myPartQ_face.svg",R2:"myPartQ_face.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function Me(l,e,P=""){const t=w(se.partName+P),n=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const r=e.D1/2,s=l*2*Math.PI/100,d=r*Math.cos(s),g=r+d,a=(0+g)/2,m=Math.sqrt(r**2-a**2);t.logstr+=`myPartQ: amplitude ${x(r)} mm
`;const f=v(r,0).addCornerRounded(e.R2).addSegStrokeA(0,r).addCornerRounded(e.R2).addSegStrokeA(-r,0).addCornerRounded(e.R2).addSegStrokeA(0,-r).addCornerRounded(e.R2).closeSegStroke();n.addMainOI([T(0,0,r),f]),n.addSecond(T(g,0,r)),n.addSecond(f.translate(g,0));const _=v(0,0).addSegStrokeA(a,0).addSegStrokeA(a,m).closeSegStroke();n.addDynamics(_);const y=v(0,0,"blue").addSegStrokeA(-a,0).addSegStrokeA(-a,-m).closeSegStroke();n.addDynamics(y);const D=N(r,0,I.eBigSquare),u=N(a,0,I.eTwoTri),M=N(a,-m,I.eTri1),c=N(-a,-m,I.eTri2),i=N(-a,m,I.eTri3);n.addPoint(D),n.addPoint(u),n.addPoint(M),n.addPoint(c),n.addPoint(i);const h=s;let A=2*r;if(h>0){const b=Math.asin(Math.sin(h)*d/r),O=Math.PI-(h+b);A=Math.sqrt(d**2+r**2-2*d*r*Math.cos(O))}const R=ue(s,A,D);n.addVector(R);const k=ye(-r,0,s);n.addLine(k),t.fig={face1:n};const S=t.partName;t.vol={extrudes:[{outName:`subpax_${S}`,face:`${S}_face1`,extrudeMethod:H.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${S}`,boolMethod:E.eIdentity,inList:[`subpax_${S}`]}]},t.sub={},t.logstr+=`myPartQ drawn successfully!
`,t.calcErr=!1}catch(r){t.logstr+=r,console.log(r)}return t}var be={pTitle:"My Part-Q",pDescription:"Using extra layers like vectors and dynamics",pDef:se,pGeom:Me},re={partName:"myPartR",params:[o("P1","mm",50,10,100,1),o("B1","mm",90,10,200,1),o("H1","mm",140,80,200,1),o("a1","degree",20,1,45,1),o("M1","mm",50,10,100,1),o("M2","mm",10,4,100,1),o("C1","mm",30,10,100,1),o("C2","mm",20,4,100,1),o("S1","mm",50,10,100,1),o("S2","mm",25,5,100,1),o("S3","mm",40,5,100,1),o("S4","mm",28,5,100,1)],paramSvg:{P1:"myPartR_dress.svg",B1:"myPartR_dress.svg",H1:"myPartR_dress.svg",a1:"myPartR_dress.svg",M1:"myPartR_dress.svg",M2:"myPartR_dress.svg",C1:"myPartR_dress.svg",C2:"myPartR_dress.svg",S1:"myPartR_short.svg",S2:"myPartR_short.svg",S3:"myPartR_short.svg",S4:"myPartR_short.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function Le(l,e,P=""){const t=w(re.partName+P),n=$(),r=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const s=Math.PI/2+L(e.a1),d=Math.PI/2-L(e.a1),g=L(42),a=L(45),m=e.H1+2.1*e.M2;t.logstr+=`myPartR: dress ${x(e.H1)} x ${x(e.B1)} mm
`;const f=N(e.P1/2,e.H1).translatePolar(L(75),1.6*e.M2),_=N(-e.P1/2,e.H1),y=_.translatePolar(L(105),1.6*e.M2),D=_.translatePolar(-Math.PI/2-g,e.M1),u=D.translatePolar(Math.PI/2+a,e.M2),M=v(0,0).addSegStrokeA(e.B1/2,0).addPointA(e.P1/2,e.H1).addSegArc3(s,!0).addSegStrokeRP(-g,e.M1).addSegStrokeRP(a,e.M2).addSegStrokeA(f.cx,f.cy).addSegStrokeA(e.C1/2,m).addSegStrokeA(e.C1*.35,m-.7*e.C2).addSegStrokeA(0,m-e.C2).addSegStrokeA(-e.C1*.35,m-.7*e.C2).addSegStrokeA(-e.C1/2,m).addSegStrokeA(y.cx,y.cy).addSegStrokeA(u.cx,u.cy).addSegStrokeA(D.cx,D.cy).addSegStrokeA(_.cx,_.cy).addSegStrokeA(-e.P1/2,e.H1).addPointA(-e.B1/2,0).addSegArc3(d,!1).closeSegStroke();n.addMainO(M);const c=N(e.S1/2,0),i=c.translatePolar(L(-80),e.S3),h=i.translatePolar(L(190),e.S4),A=N(-e.S1/2,0),R=A.translatePolar(L(-100),e.S3),k=R.translatePolar(L(-10),e.S4),S=v(c.cx,c.cy).addSegStrokeA(i.cx,i.cy).addSegStrokeA(h.cx,h.cy).addSegStrokeA(0,-e.S2).addSegStrokeA(k.cx,k.cy).addSegStrokeA(R.cx,R.cy).addSegStrokeA(A.cx,A.cy).closeSegStroke();r.addMainO(S),t.fig={faceDress:n,faceShort:r},t.sub={},t.logstr+=`myPartR drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var Ne={pTitle:"My Part-R",pDescription:"2D drawings only, without 3D export",pDef:re,pGeom:Le},ae={partName:"myPartA",params:[o("D1","mm",40,10,100,2),o("E1","mm",3,1,50,1),o("L1","mm",50,10,200,10)],paramSvg:{D1:"myPartA_section.svg",E1:"myPartA_section.svg",L1:"myPartA_side.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function Re(l,e,P=""){const t=w(ae.partName+P),n=$(),r=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const s=e.D1/2;if(s<e.E1)throw`err089: D1 ${e.D1} too small compare to E1 ${e.E1}`;t.logstr+=`myPartA-length: ${x(e.L1)} mm
`,t.logstr+=`myPartA-external-diameter: ${x(e.D1)} mm
`,t.logstr+=`myPartA-internal-diameter: ${x(e.D1-2*e.E1)} mm
`,n.addMainOI([T(0,0,s),T(0,0,s-e.E1)]);const d=v(s,0).addSegStrokeA(s,e.L1).addSegStrokeA(s-e.E1,e.L1).addSegStrokeA(s-e.E1,0).closeSegStroke(),g=v(-s,0).addSegStrokeR(e.E1,0).addSegStrokeR(0,e.L1).addSegStrokeR(-e.E1,0).closeSegStroke();r.addMainO(d),r.addSecond(g),t.fig={faceSection:n,faceSide:r};const a=t.partName;t.vol={extrudes:[{outName:`subpax_${a}`,face:`${a}_faceSection`,extrudeMethod:H.eLinearOrtho,length:e.L1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${a}`,boolMethod:E.eIdentity,inList:[`subpax_${a}`]}]},t.sub={},t.logstr+=`myPartA drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var p={pTitle:"My Part-A",pDescription:"A simple cylinder for showcasing the usage of geometrix",pDef:ae,pGeom:Re};o("L1","mm",60,10,100,10),q("extShape",["circle","triangle-up","triangle-down"]),o("D1","mm",50,10,200,5),ee("Inner hollow"),De("hollow"),q("intShape",["straight","slanted"]),o("S1","mm",20,1,100,1);var ne={partName:"myPartD",params:[o("D1","mm",60,10,200,1),o("D2","mm",40,10,200,1),o("D3","mm",100,10,200,1),o("D4","mm",80,10,200,1),o("H1","mm",30,-200,200,1)],paramSvg:{D1:"myPartD_face.svg",D2:"myPartD_face.svg",D3:"myPartD_top.svg",D4:"myPartD_top.svg",H1:"myPartD_face.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function ke(l,e,P=""){const t=w(ne.partName+P),n=$(),r=$(),s=$(),d=$(),g=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const a=e.D1/2,m=e.D2/2,f=e.D3/2,_=e.D4/2;if(e.D2>e.D1)throw`err069: D2 ${e.D2} too large compare to D1 ${e.D1}`;if(e.D4>e.D3)throw`err072: D4 ${e.D4} too large compare to D3 ${e.D3}`;if(Math.abs(e.H1)>a+f)throw`err075: abs(H1) ${e.H1} too large compare to D1 ${e.D1} and D3 ${e.D3}`;const y=e.D1+e.D3,D=y,u=y/2,M=e.H1+u;t.logstr+=`myPartD-size: ${x(y)} x ${x(D)} x ${x(M)} mm
`,n.addMainOI([T(0,e.H1,a),T(0,e.H1,m)]);const c=v(-u,-f).addSegStrokeR(D,0).addSegStrokeR(0,e.D3).addSegStrokeR(-D,0).closeSegStroke(),i=v(-u,-_).addSegStrokeR(D,0).addSegStrokeR(0,e.D4).addSegStrokeR(-D,0).closeSegStroke();n.addSecond(c),n.addSecond(i),r.addSecond(T(0,e.H1,a)),r.addMainO(T(0,e.H1,m)),r.addSecond(c),r.addSecond(i),s.addMainOI([T(0,0,f),T(0,0,_)]);const h=v(-u,e.H1-a).addSegStrokeR(y,0).addSegStrokeR(0,e.D1).addSegStrokeR(-y,0).closeSegStroke(),A=v(-u,e.H1-m).addSegStrokeR(y,0).addSegStrokeR(0,e.D2).addSegStrokeR(-y,0).closeSegStroke();s.addSecond(h),s.addSecond(A),d.addSecond(T(0,0,f)),d.addMainO(T(0,0,_)),d.addSecond(h),d.addSecond(A),g.addSecond(c),g.addSecond(i);const R=v(-a,-u).addSegStrokeR(e.D1,0).addSegStrokeR(0,y).addSegStrokeR(-e.D1,0).closeSegStroke(),k=v(-m,-u).addSegStrokeR(e.D2,0).addSegStrokeR(0,y).addSegStrokeR(-e.D2,0).closeSegStroke();g.addSecond(R),g.addSecond(k),t.fig={faceTube1:n,faceTube2:s,faceTube1H:r,faceTube2H:d,faceTop:g};const S=t.partName;t.vol={extrudes:[{outName:`subpax_${S}_tube1`,face:`${S}_faceTube1`,extrudeMethod:H.eLinearOrtho,length:y,rotate:[-Math.PI/2,0,0],translate:[0,-u,2*e.H1]},{outName:`subpax_${S}_tube1H`,face:`${S}_faceTube1H`,extrudeMethod:H.eLinearOrtho,length:y,rotate:[-Math.PI/2,0,0],translate:[0,-u,2*e.H1]},{outName:`subpax_${S}_tube2`,face:`${S}_faceTube2`,extrudeMethod:H.eLinearOrtho,length:D,rotate:[0,Math.PI/2,0],translate:[-u,0,0]},{outName:`subpax_${S}_tube2H`,face:`${S}_faceTube2H`,extrudeMethod:H.eLinearOrtho,length:D,rotate:[0,Math.PI/2,0],translate:[-u,0,0]}],volumes:[{outName:`ipax_${S}_addi`,boolMethod:E.eUnion,inList:[`subpax_${S}_tube1`,`subpax_${S}_tube2`]},{outName:`ipax_${S}_subs`,boolMethod:E.eUnion,inList:[`subpax_${S}_tube1H`,`subpax_${S}_tube2H`]},{outName:`pax_${S}`,boolMethod:E.eSubstraction,inList:[`ipax_${S}_addi`,`ipax_${S}_subs`]}]},t.sub={},t.logstr+=`myPartD drawn successfully!
`,t.calcErr=!1}catch(a){t.logstr+=a,console.log(a)}return t}var Z={pTitle:"My Part-D",pDescription:"Illustrating the power of 2D technical drawing",pDef:ne,pGeom:ke};o("L1","mm",200,10,400,1),o("H1","mm",100,10,400,1),o("H2","mm",60,10,400,1),o("L2","mm",60,10,400,1),o("L3","mm",40,10,400,1),o("R1","mm",10,0,50,1),o("R2","mm",10,0,50,1),o("R3","mm",10,0,50,1),o("R4","mm",10,0,50,1),q("CS",["pointed","rounded","widened","wideAcc"]),o("R5","mm",10,0,50,1),o("extrudLength","mm",50,1,400,1);o("F1H2","mm",300,10,400,1),o("F1L2","mm",300,10,400,1),o("F1L3","mm",300,10,400,1),o("F1R1","mm",10,0,50,1),o("F1R2","mm",10,0,50,1),o("F1R3","mm",10,0,50,1),o("F1R4","mm",10,0,50,1),q("F1CS",["pointed","rounded","widened","wideAcc"]),o("F1R5","mm",10,0,50,1),o("F2A","mm",100,10,400,1),o("F2B","mm",200,10,400,1),o("F2R","mm",10,0,50,1),o("F2C","mm",100,10,400,1),o("F2SF1","1.0",2,.5,3,.1),o("F2Z1","degree",45,-180,180,1),o("F3B","mm",140,10,200,1),o("F3R1","mm",10,0,50,1);var ce={partName:"myPartK",params:[o("D1","mm",60,10,200,1),o("D2","mm",40,10,200,1),o("D3","mm",100,10,200,1),o("D4","mm",80,10,200,1),o("H1","mm",30,-200,200,1),o("L1","mm",30,10,200,1),o("L2","mm",30,0,200,1)],paramSvg:{D1:"myPartK_face.svg",D2:"myPartK_face.svg",D3:"myPartK_top.svg",D4:"myPartK_top.svg",H1:"myPartK_face.svg",L1:"myPartK_top.svg",L2:"myPartK_top.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function Te(l,e,P=""){const t=w(ce.partName+P),n=$(),r=$(),s=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const d=e.D1/2,g=e.D3/2;if(e.D2>e.D1)throw`err069: D2 ${e.D2} too large compare to D1 ${e.D1}`;if(e.D4>e.D3)throw`err072: D4 ${e.D4} too large compare to D3 ${e.D3}`;if(Math.abs(e.H1)>d+g)throw`err075: abs(H1) ${e.H1} too large compare to D1 ${e.D1} and D3 ${e.D3}`;const a=(e.D1+e.D3)/2,m=2*a+2*(e.L1+e.L2),f=m,_=Math.min(e.D1,e.D3)/2,y=Math.max(e.D1,e.D3)/2,D=y+Math.max(y,Math.abs(e.H1)+_);t.logstr+=`myPartK-size: ${x(m)} x ${x(f)} x ${x(D)} mm
`;const u=F(Z.pDef);u.setVal("D1",e.D1),u.setVal("D2",e.D2),u.setVal("D3",e.D3),u.setVal("D4",e.D4),u.setVal("H1",e.H1);const M=Z.pGeom(0,u.getParamVal(),u.getSuffix());G(M),t.logstr+=W(M.logstr,u.getPartNameSuffix());const c=F(p.pDef,"ref1");c.setVal("D1",e.D1),c.setVal("E1",(e.D1-e.D2)/2),c.setVal("L1",e.L1);const i=p.pGeom(0,c.getParamVal(),c.getSuffix());G(i),t.logstr+=W(i.logstr,c.getPartNameSuffix());const h=F(p.pDef,"ref2");h.setVal("D1",e.D3),h.setVal("E1",(e.D3-e.D4)/2),h.setVal("L1",e.L1);const A=p.pGeom(0,h.getParamVal(),h.getSuffix());G(A),t.logstr+=W(A.logstr,h.getPartNameSuffix());const R=i.fig.faceSide,k=i.fig.faceSide.rotate(0,0,Math.PI/2),S=A.fig.faceSide.rotate(0,0,Math.PI/2);n.mergeFigure(M.fig.faceTube1),n.mergeFigure(S.translate(-a-e.L2,0)),n.mergeFigure(S.translate(a+e.L2+e.L1,0)),r.mergeFigure(M.fig.faceTube2),r.mergeFigure(k.translate(-a-e.L2,e.H1)),r.mergeFigure(k.translate(a+e.L2+e.L1,e.H1)),s.mergeFigure(M.fig.faceTop),s.mergeFigure(S.translate(-a-e.L2,0)),s.mergeFigure(S.translate(a+e.L2+e.L1,0)),s.mergeFigure(R.translate(0,a+e.L2)),s.mergeFigure(R.translate(0,-a-e.L2-e.L1)),t.fig={faceSide1:n,faceSide2:r,faceTop:s};const b=t.partName;t.vol={inherits:[{outName:`inpax_${b}_A11`,subdesign:"pax_myPartAref1",subgeom:i,rotate:[-Math.PI/2,0,0],translate:[0,-a-e.L2-e.L1,e.H1]},{outName:`inpax_${b}_A12`,subdesign:"pax_myPartAref1",subgeom:i,rotate:[-Math.PI/2,0,0],translate:[0,a+e.L2,e.H1]},{outName:`inpax_${b}_A21`,subdesign:"pax_myPartAref2",subgeom:A,rotate:[0,Math.PI/2,0],translate:[-a-e.L2-e.L1,0,0]},{outName:`inpax_${b}_A22`,subdesign:"pax_myPartAref2",subgeom:A,rotate:[0,Math.PI/2,0],translate:[a+e.L2,0,0]},{outName:`inpax_${b}_cross`,subdesign:"pax_myPartD",subgeom:M,rotate:[0,0,0],translate:[0,0,0]}],extrudes:[],volumes:[{outName:`pax_${b}`,boolMethod:E.eUnion,inList:[`inpax_${b}_A11`,`inpax_${b}_A12`,`inpax_${b}_A21`,`inpax_${b}_A22`,`inpax_${b}_cross`]}]},t.sub={myPartA_1:{partName:c.getPartName(),dparam:c.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]},myPartA_2:{partName:h.getPartName(),dparam:h.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]},myPartD_1:{partName:u.getPartName(),dparam:u.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]}},t.logstr+=`myPartK drawn successfully!
`,t.calcErr=!1}catch(d){t.logstr+=d,console.log(d)}return t}var X={pTitle:"My Part-K",pDescription:"assembling 3D-parts defined elsewhere",pDef:ce,pGeom:Te},ie={partName:"myPartS",params:[o("ai1","degree",-1,-90,0,1),o("ai2","degree",-35,-90,0,1),o("Li1","mm",120,10,300,1),o("Li2","mm",40,10,300,1),o("Ri1","mm",150,100,2e3,1),o("Ri2","mm",1e3,100,2e3,1),o("Rai1","mm",15,1,50,1),o("Rai2","mm",8,1,50,1),o("Rqi1","mm",4,1,30,1),o("Rqi2","mm",4,1,30,1),o("He1","mm",20,1,200,1),o("He2","mm",10,1,200,1),o("Pe1","mm",40,1,300,1),o("Pe2","mm",25,1,300,1),o("pN","profiles",10,1,20,1)],paramSvg:{ai1:"myPartS_profile.svg",ai2:"myPartS_profile.svg",Li1:"myPartS_profile.svg",Li2:"myPartS_profile.svg",Ri1:"myPartS_profile.svg",Ri2:"myPartS_profile.svg",Rai1:"myPartS_profile.svg",Rai2:"myPartS_profile.svg",Rqi1:"myPartS_profile.svg",Rqi2:"myPartS_profile.svg",He1:"myPartS_profile.svg",He2:"myPartS_profile.svg",Pe1:"myPartS_profile.svg",Pe2:"myPartS_profile.svg",pN:"myPartS_profile.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function B(l,e,P){return l+(e-l)*P}function J(l,e,P){return l+(e-l)*Math.sqrt(P)}function He(l,e,P){return l+(e-l)*P**2}function pe(l,e,P=""){const t=w(ie.partName+P),n=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{if(e.Rai1>e.He1)throw`err795: Rai1 ${e.Rai1} is too large compare to He1 ${e.He1}`;if(e.ai1<e.ai2)throw`err796: ai1 ${e.ai1} is too negative compare to ai2 ${e.ai2}`;t.logstr+=`myPartS: Li1 ${x(e.Li1)}  Li2 ${x(e.Li2)} mm
`;const r=function(c,i,h,A,R,k,S){const b=L(c),O=N(0,0),V=N(i,-i),K=h/A,me=V.translate(0,-A),U=V.rotate(me,-K),fe=Math.PI/2-K,Q=Math.atan2(k,h-S),Se=Math.PI-K-Q,Pe=U.translatePolar(fe,R),Y=U.rotate(Pe,Math.PI-Q),z=N(S,k);return v(O.cx,O.cy).addPointA(V.cx,V.cy).addSegArc(i,!1,!0).addPointA(U.cx,U.cy).addSegArc(A,!1,!1).addPointA(Y.cx,Y.cy).addSegArc(R,!1,!0).addPointA(z.cx,z.cy).addSeg2Arcs(Se,0).addPointA(O.cx,O.cy).addSeg2Arcs(Math.PI,Math.PI/2).rotate(0,0,b)},s={length:e.pN},d=Array.from(s,(c,i)=>B(e.ai1,e.ai2,i/e.pN)),g=Array.from(s,(c,i)=>B(e.Rai1,e.Rai2,i/e.pN)),a=Array.from(s,(c,i)=>He(e.Li1,e.Li2,i/e.pN)),m=Array.from(s,(c,i)=>B(e.Ri1,e.Ri2,i/e.pN)),f=Array.from(s,(c,i)=>B(e.Rqi1,e.Rqi2,i/e.pN)),_=Array.from(s,(c,i)=>J(e.He1,e.He2,i/e.pN)),y=Array.from(s,(c,i)=>J(e.Pe1,e.Pe2,i/e.pN));for(let c=0;c<e.pN;c++)n.addMainO(r(d[c],g[c],a[c],m[c],f[c],_[c],y[c]).translate(0,-c*e.Li1));t.fig={flat:n};for(let c=0;c<e.pN;c++){const i=$();i.addMainO(r(d[c],g[c],a[c],m[c],f[c],_[c],y[c])),t.fig[`prf${c.toString().padStart(2,"0")}`]=i}const D=t.partName,u=[],M=[];for(let c=0;c<e.pN;c++){const i=`subpax_${D}_prf${c.toString().padStart(2,"0")}`,h={outName:i,face:`${D}_prf${c.toString().padStart(2,"0")}`,extrudeMethod:H.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,c*20]};u.push(h),M.push(i)}t.vol={extrudes:u,volumes:[{outName:`pax_${D}`,boolMethod:E.eUnion,inList:M}]},t.sub={},t.logstr+=`myPartS drawn successfully!
`,t.calcErr=!1}catch(r){t.logstr+=r,console.log(r)}return t}var Ee={pTitle:"My Part-S",pDescription:"a serie of blade profiles",pDef:ie,pGeom:pe};p.pTitle="my Part-T";p.pDescription="a re-export of myPartADef with few modifications";var de={partName:"myPartU",params:[o("D1","mm",60,1,200,1),o("D2","mm",30,1,200,1),o("E1","mm",5,1,200,1),o("L1","mm",40,1,200,1)],paramSvg:{D1:"myPartU_side.svg",D2:"myPartU_side.svg",E1:"myPartU_section.svg",L1:"myPartU_section.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function we(l,e,P=""){const t=w(de.partName+P),n=$(),r=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{if(e.E1>e.D1/2)throw`err395: E1 ${e.E1} is too large compare to D1 ${e.D1}`;if(e.E1>e.D2/2)throw`err396: E1 ${e.E1} is too large compare to D2 ${e.D2}`;t.logstr+=`myPartU: Length ${x(5*e.L1)}  Dmax ${x(Math.max(e.D1,e.D2))} mm
`;const s=F(p.pDef,"ref1");s.setVal("D1",e.D1),s.setVal("E1",e.E1),s.setVal("L1",e.L1);const d=p.pGeom(0,s.getParamVal(),s.getSuffix());G(d),t.logstr+=W(d.logstr,s.getPartNameSuffix());const g=F(p.pDef,"ref2");g.setVal("D1",e.D2),g.setVal("E1",e.E1),g.setVal("L1",e.L1);const a=p.pGeom(0,g.getParamVal(),g.getSuffix());G(a),t.logstr+=W(a.logstr,g.getPartNameSuffix()),n.mergeFigure(d.fig.faceSide.translate(0,2*e.L1)),n.mergeFigure(a.fig.faceSide.translate(0,0*e.L1)),n.mergeFigure(a.fig.faceSide.translate(0,4*e.L1)),r.mergeFigure(d.fig.faceSection),r.mergeFigure(a.fig.faceSection),t.fig={faceSide:n,faceSection:r};const m=t.partName;t.vol={inherits:[{outName:`inpax_${m}_A1`,subdesign:"pax_myPartAref1",subgeom:d,rotate:[0,0,0],translate:[0,0,2*e.L1]},{outName:`inpax_${m}_A21`,subdesign:"pax_myPartAref2",subgeom:a,rotate:[0,0,0],translate:[0,0,0]},{outName:`inpax_${m}_A22`,subdesign:"pax_myPartAref2",subgeom:a,rotate:[0,0,0],translate:[0,0,4*e.L1]}],extrudes:[],volumes:[{outName:`pax_${m}`,boolMethod:E.eUnion,inList:[`inpax_${m}_A1`,`inpax_${m}_A21`,`inpax_${m}_A22`]}]},t.sub={},t.logstr+=`myPartU drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var Ie={pTitle:"My Part-U",pDescription:"an assembly of external design",pDef:de,pGeom:we};X.pTitle="my Part-V";X.pDescription="a re-export of myPartKDef with few modifications";X.pDef.partName="myPartV";var ge={partName:"myPartW",params:[o("W1","m",10,1,50,.1),o("T1","m",15,1,50,.1),o("E1","m",.2,.05,.5,.01),ee("roof"),o("L1","m",1,0,2,.1),o("L2","m",1,0,2,.1),o("H1","m",4,1,10,.1),o("H2","m",4,1,10,.1),o("E2","m",.2,.05,.5,.01)],paramSvg:{W1:"myPartW_top.svg",T1:"myPartW_top.svg",E1:"myPartW_top.svg",L1:"myPartW_top.svg",L2:"myPartW_top.svg",H1:"myPartW_face.svg",H2:"myPartW_face.svg",E2:"myPartW_face.svg"},sim:{tMax:360,tStep:.5,tUpdate:500}};function Oe(l,e,P=""){const t=w(ge.partName+P),n=$(),r=$();t.logstr+=`${t.partName} simTime: ${l}
`;try{const s=Math.atan2(e.H2,e.W1/2),d=(e.W1/2+e.L1)/Math.cos(s),g=d-e.E2*Math.tan(s),a=L(l);if(2*e.E1>e.W1)throw`err295: E1 ${e.E1} is too large compare to W1 ${e.W1}`;if(e.E1>e.T1)throw`err296: E1 ${e.E1} is too large compare to T1 ${e.T1}`;t.logstr+=`myPartW: height ${x(e.H1+e.H2)} m
`,t.logstr+=`myPartW: roof-angle ${x(_e(s))} degree
`,t.logstr+=`myPartW: one-side roof-length ${x(d)} m
`,n.addMainOI([C(-e.W1/2,0,e.W1,e.T1),C(-e.W1/2+e.E1,e.E1,e.W1-2*e.E1,e.T1-2*e.E1)]),n.addDynamics(j(-e.W1/2,0,e.W1,e.T1,a)),n.addDynamics(j(-e.W1/2+e.E1*Math.sqrt(2)*Math.cos(Math.PI/4+a),e.E1*Math.sqrt(2)*Math.sin(Math.PI/4+a),e.W1-2*e.E1,e.T1-2*e.E1,a)),n.addSecond(C(-e.W1/2-e.L1,-e.L2,e.W1/2+e.L1,e.T1+2*e.L2)),n.addSecond(C(0,-e.L2,e.W1/2+e.L1,e.T1+2*e.L2));const m=v(0,e.H1+e.H2).addSegStrokeRP(Math.PI+s,d).addSegStrokeRP(-Math.PI/2+s,e.E2).addSegStrokeRP(s,g).addSegStrokeRP(-s,g).addSegStrokeRP(Math.PI/2-s,e.E2).closeSegStroke();r.addMainO(m),r.addSecond(C(-e.W1/2,0,e.W1,e.H1)),r.addSecond(C(-e.W1/2+e.E1,0,e.W1-2*e.E1,e.H1)),t.fig={faceTop:n,faceFace:r};const f=t.partName,_=he();_.addRotation(Math.PI/2,0,0),_.addTranslation(0,e.L2+e.T1,0),_.addRotation(0,0,Math.PI/4),t.vol={extrudes:[{outName:`subpax_${f}_wall`,face:`${f}_faceTop`,extrudeMethod:H.eLinearOrtho,length:e.H1,rotate:[0,0,Math.PI/4],translate:[0,0,0]},{outName:`subpax_${f}_roof`,face:`${f}_faceFace`,extrudeMethod:H.eLinearOrtho,length:e.T1+2*e.L2,rotate:_.getRotation(),translate:_.getTranslation()}],volumes:[{outName:`pax_${f}`,boolMethod:E.eUnion,inList:[`subpax_${f}_wall`,`subpax_${f}_roof`]}]},t.sub={},t.logstr+=`myPartW drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var Ce={pTitle:"My Part-W",pDescription:"illustrating transform3d for positioning extrusion in the 3D-space",pDef:ge,pGeom:Oe};const le={"desi53/myPartO":$e,"desi53/myPartP":ve,"desi53/myPartQ":be,"desi53/myPartR":Ne,"desi53b/myPartS":Ee,"desi53b/myPartT":p,"desi53b/myPartU":Ie,"desi53b/myPartV":X,"desi53b/myPartW":Ce};function Fe(l){const e=/^.*\//g;return l.replace(e,"")}function Ge(l){const e={};for(const P of Object.keys(l)){const t=Fe(P);e[t]=`/${P}`}return e}function We(l){const e=[];for(const P of Object.keys(l))e.push(P);return e}const qe=Ge(le),Xe=We(le);export{le as a,qe as b,Xe as d};
