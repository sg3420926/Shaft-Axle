import React, { useState} from 'react';
import '../CSS/shaft.css';
import Header from './Header';

function Shaft() {
	const [shaft, setShaft] = useState({ types: '', Ls: '', DstbSup: '',sr:'' });
	const [htl, setHtl] = useState([]);
	const [vtl, setVtl] = useState([]);
	const [disl, setDisl] = useState([]);
	const [disl2, setDisl2] = useState([]);
	const [twiMoment, setTwiMoment] = useState('');
	const [Maxbm, setMaxbm] = useState('');
	const [result, setResult] = useState( );
	const [result2, setResult2] = useState( );
	const [ratio, setRatio] = useState('');
    const [aot,setAot] =useState('')
	const [mor,setMor] =useState('')
	const [dis2,setDis2]=useState('none')
	const [dis3,setDis3]=useState('none')
	const [dis4,setDis4]=useState('none')
	const [dis5,setDis5]=useState('none')
	const [dis6,setDis6]=useState('none')
	const [asme,setAsme]=useState({yts:'',uts:'',fos:''})
	const handleasme=(e)=>{
        setAsme({...asme,[e.target.name]:e.target.value})
	}
	const [st,setSt]=useState('')
	const asmeopen=(e)=>{
        setSt(e.target.value)
		setDis4('block')
		setDis5('none')

	}
	const asmeclose=(e)=>{
		setSt(e.target.value)
		setDis4('none')
		setDis5('block')
	}
	const [mf,setMf]=useState('')
	const [tf,setTf]=useState('')
	const handlemf=(e)=>{
		setMf(e.target.value)
	}
	const handletf=(e)=>{
		setTf(e.target.value)
	}
	const changeHandle = (e) => {
		setShaft({ ...shaft, [e.target.name]: e.target.value });
		e.preventDefault();
	};
	const handleaot=(e)=>{
		setAot(e.target.value)
	}
	const handlemor=(e)=>{
		setMor(e.target.value)
	}
	const [dis,setDis]= useState('none')
	const handleRatio=(e)=>{
		setRatio(e.target.value)
	}
	const change2 = async(e) => {
		setShaft({ ...shaft, [e.target.name]: e.target.value });
		if(shaft.types==='Hollow-Shaft'){
			await setDis('block')
		}
		if(shaft.type==='Hollow-Shaft'){
			setDis('none')
			await setRatio('')
		}
		if(shaft.sr==='Rigid'){
			setDis2('block')
			setDis3('none')
		}
		if(shaft.sr==='Strength'){
        setDis2('none')
		setDis3('block')
		}
	};
	const handle = (e) => {
		setHtl([...htl, e]);
		alert(`Horizontal Transverse Loads are ${htl}`);
	};
	const handle2 = (e) => {
		setVtl([...vtl, e]);
		alert(`Vertical Transverse Loads are ${vtl}`);
	};
	const handle3 = (e) => {
		setDisl([...disl, e]);
		alert(`Distance of Horizontal Transverse Loads are ${disl}`);
	};
	const handle4 = (e) => {
		setDisl2([...disl2, e]);
		alert(`Distance of Vertical Transverse Loads are ${disl2}`);
	};
	const twihandle = (e) => {
		setTwiMoment(e.target.value);
		console.log(twiMoment);
	};
	const bmHandle = (e) => {
		setMaxbm(e.target.value);
	};

	const Diameter = () => {
		let maxi;
		if (Maxbm!=='') {
			maxi = Maxbm;
		} else {
			let r2 = 0;
			let dbsp = Number(shaft.DstbSup);
			for (let i = 0; i < disl.length; i++) {
				r2 = r2 + Number(disl[i]) * Number(htl[i]);
			}
			r2 = r2 / Number(shaft.DstbSup);
			let s = 0;
			for (let i = 0; i < disl.length; i++) {
				s = s + Number(htl[i]);
			}
			let r1 = s - r2;
			const leftd = [];
			const rightd = [];
			const leftl = [];
			const rightl = [];
			const vleftd = [];
			const vrightd = [];
			const vleftl = [];
			const vrightl = [];
			for (let j = 0; j < disl.length; j++) {
				if (Number(disl[j]) < Number(shaft.DstbSup)) {
					leftd.push(Number(disl[j]));
					leftl.push(Number(htl[j]));
				} else {
					rightd.push(Number(disl[j]));
					rightl.push(Number(htl[j]));
				}
			}
			for (let j = 0; j < disl2.length; j++) {
				if (Number(disl2[j]) < Number(shaft.DstbSup)) {
					vleftd.push(Number(disl2[j]));
					vleftl.push(Number(vtl[j]));
				} else {
					vrightd.push(Number(disl2[j]));
					vrightl.push(Number(vtl[j]));
				}
			}

			const rm = [];
			const m = [];
			const di = [];
			for (let j = 0; j < leftd.length; j++) {
				let mment = r1 * leftd[j];
				for (let k = 0; k < di.length; k++) {
					mment = mment - leftl[k] * (leftd[j] - di[k]);
				}
				m.push(mment);
				di.push(leftd[j]);
			}
			if (rightd.length > 0 && vrightd.length === 0) {
				let mm = r1 * dbsp;
				for (let k = 0; k < di.length; k++) {
					mm = mm - leftl[k] * (dbsp - di[k]);
				}
				rm.push(mm);
				for (let j = 0; j < rightd.length - 1; j++) {
					let mmm = r1 * rightd[j];
					for (let k = 0; k < di.length; k++) {
						mmm = mmm - Number(htl[k]) * (rightd[j] - di[k]);
					}
					mmm = mmm + r2 * (rightd[j] - dbsp);
					m.push(mmm);
					di.push(rightd[j]);
				}
			}
			console.log(m,maxi)
			const d2 = [];
			const m2 = [];
			for (let i = 0; i < vleftd.length; i++) {
				let hm = vleftd[i] * r1;
				for (let j = 0; j < leftd.length; j++) {
					if (!d2.includes(leftd[j]) && leftd[j] < vleftd[i]) {
						d2.push(leftd[j]);
					}
				}
				for (let p = 0; p < d2.length; p++) {
					hm = hm - leftl[p] * (vleftd[i] - d2[p]);
				}
				m2.push(hm);
			}
			const d3 = [];
			if (vrightd.length > 0 && rightd.length === 0) {
				let hm = r1 * dbsp;
				for (let k = 0; k < leftd.length; k++) {
					hm = hm - leftl[k] * (dbsp - di[k]);
				}
				rm.push(hm);

				for (let j = 0; j < vrightd.length - 1; j++) {
					let hm = r1 * vrightd[j];
					for (let x = 0; x < disl.length; x++) {
						if (!d3.includes(Number(disl[x])) && Number(disl[x] < vrightd[j])) {
							d3.push(Number(disl[x]));
						}
					}
					for (let k = 0; k < d3.length; k++) {
						hm = hm - Number(htl[k]) * (vrightd[j] - d3[k]);
					}
					hm = hm + r2 * (vrightd[j] - dbsp);
					m2.push(hm);
				}
			}
			console.log(rm,maxi)
			if (vrightd.length > 0 && rightd.length > 0) {
				let mm = r1 * dbsp;
				for (let k = 0; k < di.length; k++) {
					mm = mm - leftl[k] * (dbsp - di[k]);
				}
				rm.push(mm);
				if (vrightd.slice(-1)[0] > rightd.slice(-1)[0]) {
					for (let j = 0; j < rightd.length; j++) {
						let mmm = r1 * rightd[j];
						for (let k = 0; k < di.length; k++) {
							mmm = mmm - Number(htl[k]) * (rightd[j] - di[k]);
						}
						mmm = mmm + r2 * (rightd[j] - dbsp);
						m.push(mmm);
						di.push(rightd[j]);
					}
					for (let j = 0; j < vrightd.length - 1; j++) {
						let hm = r1 * vrightd[j];
						for (let x = 0; x < disl.length; x++) {
							if (
								!d3.includes(Number(disl[x])) &&
								Number(disl[x] < vrightd[j])
							) {
								d3.push(Number(disl[x]));
							}
						}
						console.log(d3);
						for (let k = 0; k < d3.length; k++) {
							hm = hm - Number(htl[k]) * (vrightd[j] - d3[k]);
						}
						hm = hm + r2 * (vrightd[j] - dbsp);
						m2.push(hm);
					}
				} else {
					for (let j = 0; j < rightd.length - 1; j++) {
						let mmm = r1 * rightd[j];
						for (let k = 0; k < di.length; k++) {
							mmm = mmm - Number(htl[k]) * (rightd[j] - di[k]);
						}
						mmm = mmm + r2 * (rightd[j] - dbsp);
						m.push(mmm);
						di.push(rightd[j]);
					}
					for (let j = 0; j < vrightd.length; j++) {
						let hm = r1 * vrightd[j];
						for (let x = 0; x < disl.length; x++) {
							if (
								!d3.includes(Number(disl[x])) &&
								Number(disl[x] < vrightd[j])
							) {
								d3.push(Number(disl[x]));
							}
						}
						for (let k = 0; k < d3.length; k++) {
							hm = hm - Number(htl[k]) * (vrightd[j] - d3[k]);
						}
						hm = hm + r2 * (vrightd[j] - dbsp);
						m2.push(hm);
					}
				}
			}
			/*for verticAL LOAD*/
			let vr2 = 0;
			for (let i = 0; i < disl2.length; i++) {
				vr2 = vr2 + Number(disl2[i]) * Number(vtl[i]);
			}
			vr2 = vr2 / Number(shaft.DstbSup);
			let vs = 0;
			for (let i = 0; i < disl2.length; i++) {
				vs = vs + Number(vtl[i]);
			}
			let vr1 = vs - vr2;
			const vclm = [];
			const vcldi = [];
			for (let j = 0; j < vleftd.length; j++) {
				let vclmment = vr1 * vleftd[j];
				for (let k = 0; k < vcldi.length; k++) {
					vclmment = vclmment - vleftl[k] * (vleftd[j] - vcldi[k]);
				}
				vclm.push(vclmment);
				vcldi.push(vleftd[j]);
			}
			if (vrightd.length > 0 && rightd.length === 0) {
				let mm = vr1 * dbsp;
				for (let k = 0; k < vcldi.length; k++) {
					mm = mm - vleftl[k] * (dbsp - vcldi[k]);
				}
				rm.push(mm);
				for (let j = 0; j < vrightd.length - 1; j++) {
					let mmm = vr1 * vrightd[j];
					for (let k = 0; k < vcldi.length; k++) {
						mmm = mmm - Number(vtl[k]) * (vrightd[j] - vcldi[k]);
					}
					mmm = mmm + vr2 * (vrightd[j] - dbsp);
					vclm.push(mmm);
					vcldi.push(rightd[j]);
				}
			}
			const vcld2 = [];
			const vclm2 = [];
			for (let i = 0; i < leftd.length; i++) {
				let hm = leftd[i] * vr1;
				for (let j = 0; j < vleftd.length; j++) {
					if (!vcld2.includes(vleftd[j]) && vleftd[j] < leftd[i]) {
						vcld2.push(vleftd[j]);
					}
				}
				for (let p = 0; p < vcld2.length; p++) {
					hm = hm - vleftl[p] * (leftd[i] - vcld2[p]);
				}
				vclm2.push(hm);
			}
			const vcld3 = [];
			if (rightd.length > 0 && vrightd.length === 0) {
				let hm = vr1 * dbsp;
				for (let k = 0; k < vleftd.length; k++) {
					hm = hm - vleftl[k] * (dbsp - vcldi[k]);
				}
				rm.push(hm);

				for (let j = 0; j < rightd.length - 1; j++) {
					let hm = vr1 * rightd[j];
					for (let x = 0; x < disl2.length; x++) {
						if (
							!vcld3.includes(Number(disl2[x])) &&
							Number(disl2[x] < rightd[j])
						) {
							vcld3.push(Number(disl2[x]));
						}
					}
					for (let k = 0; k < vcld3.length; k++) {
						hm = hm - Number(vtl[k]) * (rightd[j] - vcld3[k]);
					}
					hm = hm + vr2 * (rightd[j] - dbsp);
					vclm2.push(hm);
				}
			}
			if (rightd.length > 0 && vrightd.length > 0) {
				let mm = vr1 * dbsp;
				for (let k = 0; k < vcldi.length; k++) {
					mm = mm - vleftl[k] * (dbsp - vcldi[k]);
				}
				rm.push(mm);
				if (rightd.slice(-1)[0] > vrightd.slice(-1)[0]) {
					console.log('sa2');
					for (let j = 0; j < vrightd.length; j++) {
						let mmm = vr1 * vrightd[j];
						for (let k = 0; k < vcldi.length; k++) {
							mmm = mmm - Number(htl[k]) * (vrightd[j] - vcldi[k]);
						}
						mmm = mmm + vr2 * (vrightd[j] - dbsp);
						vclm.push(mmm);
						vcldi.push(vrightd[j]);
					}
					for (let j = 0; j < rightd.length - 1; j++) {
						let hm = vr1 * rightd[j];
						for (let x = 0; x < disl2.length; x++) {
							if (
								!vcld3.includes(Number(disl2[x])) &&
								Number(disl2[x] < rightd[j])
							) {
								vcld3.push(Number(disl2[x]));
							}
						}
						for (let k = 0; k < vcld3.length; k++) {
							hm = hm - Number(vtl[k]) * (rightd[j] - vcld3[k]);
						}
						hm = hm + r2 * (rightd[j] - dbsp);
						vclm2.push(hm);
					}
				} else {
					for (let j = 0; j < vrightd.length - 1; j++) {
						let mmm = vr1 * vrightd[j];
						for (let k = 0; k < vcldi.length; k++) {
							mmm = mmm - Number(vtl[k]) * (vrightd[j] - vcldi[k]);
						}
						mmm = mmm + vr2 * (vrightd[j] - dbsp);
						vclm.push(mmm);
						vcldi.push(vrightd[j]);
					}
					for (let j = 0; j < rightd.length; j++) {
						let hm = vr1 * rightd[j];
						for (let x = 0; x < disl2.length; x++) {
							if (
								!vcld3.includes(Number(disl2[x])) &&
								Number(disl2[x] < rightd[j])
							) {
								vcld3.push(Number(disl2[x]));
							}
						}
						for (let k = 0; k < vcld3.length; k++) {
							hm = hm - Number(vtl[k]) * (rightd[j] - vcld3[k]);
						}
						hm = hm + vr2 * (rightd[j] - dbsp);
						vclm2.push(hm);
					}
				}
			}
			const mam = [];
			for (let y = 0; y < m.length; y++) {
				mam.push(Math.sqrt(m[y] ** 2 + vclm2[y] ** 2));
			}
			for (let y = 0; y < m2.length; y++) {
				mam.push(Math.sqrt(m2[y] ** 2 + vclm[y] ** 2));
			}
			mam.push(Math.sqrt(rm[0] ** 2 + rm[1] ** 2));
			maxi = Math.max.apply(null, mam);
			setMaxbm(maxi)
		}
		if(shaft.types==='Solid-Shaft' && shaft.sr==='Rigid'){
			let n=32*twiMoment*shaft.Ls*180*1000
			let d=Math.PI**2*mor*aot
			setResult((n/d)**0.25)
			setDis6('block')
		}
		if(shaft.types==='Hollow-Shaft' && shaft.sr==='Rigid'){
			let n=32*twiMoment*shaft.Ls*180*1000
			let d=Math.PI**2*mor*aot*(1-ratio**4)
			setResult((n/d)**0.25)
			setDis6('block')
		}
		if(shaft.types==='Solid-Shaft' && shaft.sr==='Strength' && st==='Yes'){
		const sd=[]
		sd.push(0.3*Number(asme.yts))
		sd.push(0.18*Number(asme.uts))
		let mim=Math.min.apply(null, sd)
		let d2 = (16*Number(asme.fos)*1000)/(Math.PI*mim)
		let d3 = (Number(mf)*maxi)**2
		let d3sec=d3+(3/4)*(Number(tf)*Number(twiMoment))**2
		d3=d3+(Number(tf)*Number(twiMoment))**2
		
		d3sec=Math.sqrt(d3sec)
		d3=Math.sqrt(d3)
		let d5=d3*d2
		setResult(d5**(1/3))
        let d4=(32*Number(asme.fos)*1000)/(Math.PI*asme.yts)
		let d6=d3sec*d4
		setResult2(d6**(1/3))
		setDis6('block')
	}
	if(shaft.types==='Hollow-Shaft' && shaft.sr==='Strength' && st==='Yes'){
		const sd=[]
		sd.push(0.3*Number(asme.yts))
		sd.push(0.18*Number(asme.uts))
		let mim=Math.min.apply(null, sd)
		let d2 = (16*Number(asme.fos)*1000)/(Math.PI*mim*(1-ratio**4))
		let d3 = (Number(mf)*maxi)**2
		let d3sec=d3+(3/4)*(Number(tf)*Number(twiMoment))**2
		d3=d3+(Number(tf)*Number(twiMoment))**2
		
		d3sec=Math.sqrt(d3sec)
		d3=Math.sqrt(d3)
		let d5=d3*d2
		setResult(d5**(1/3))
        let d4=(32*Number(asme.fos)*1000)/(Math.PI*asme.yts*(1-ratio**4))
		let d6=d3sec*d4
		setResult2(d6**(1/3))
		setDis6('block')
	}
	if(shaft.types==='Solid-Shaft' && shaft.sr==='Strength' && st==='No'){
		let d2 = (16*Number(asme.fos)*1000)/(Math.PI*0.5*asme.yts)
		
		let d3 = (Number(mf)*maxi)**2
		let d3sec=d3+(3/4)*(Number(tf)*Number(twiMoment))**2
		d3=d3+(Number(tf)*Number(twiMoment))**2
		
		console.log(d3sec)
		d3sec = Math.sqrt(d3sec)
		d3=Math.sqrt(d3)
		console.log(d3,d3sec)
		let d5=d3*d2
		setResult(d5**(1/3))
        let d4=(32*Number(asme.fos)*1000)/(Math.PI*asme.yts)
		let d6=d3sec*d4
		setResult2(d6**(1/3))
        setDis6('block')
		
	}
	if(shaft.types==='Hollow-Shaft' && shaft.sr==='Strength' && st==='No'){
		let d2 = (16*Number(asme.fos)*1000)/(Math.PI*0.5*asme.yts*(1-ratio**4))
		console.log(maxi)
		let d3 = (Number(mf)*maxi)**2
		let d3sec=d3+(3/4)*(Number(tf)*Number(twiMoment))**2
		d3=d3+(Number(tf)*Number(twiMoment))**2
		
		d3sec = Math.sqrt(d3sec)
		d3=Math.sqrt(d3)
		let d5=d3*d2
		setResult(d5**(1/3))
        let d4=(32*Number(asme.fos)*1000)/(Math.PI*asme.yts*(1-ratio**4))
		let d6=d3sec*d4
		setResult2(d6**(1/3))
		setDis6('block')
		
	}
	};
	const popdown=()=>{
		setDis6('none')
	}
	return (<>
		<div className="sh">
		<div id="myModal" className="modal" style={{ display: dis6 }}>
                <div className="modal-content">
                    <span className="close" onClick={popdown}>&times;</span>
                    <span className='re'>Maximum Bending Moment Is :- {Maxbm}Nm</span>
					<span className='re'>Maximum Twisting Moment :- {twiMoment}Nm</span>
	            {shaft.sr==='Rigid'?<span className='re'>According to Rigidity criteriea, The diameter of Shaft is :- {result}mm</span>
				:<div><span className='re'>According to Maximum Shear Stress Theory:- {result}mm</span>
				<span className='re'>According to Maximum Distortional Energy Theory:- {result2}mm</span>
				</div>}
                </div>
                </div>
			<div className="s1">
				<Header clo1={'black'} clo2={'white'} />
				<h1>
					<u>Shaft Design :</u>
				</h1>
				<span for="types">Solid-Shaft</span>
				<input
					type="radio"
					name="types"
					value="Solid-Shaft"
					onClick={change2}
				/>
				<span for="a1">Hollow-Shaft</span>
				<input
					type="radio"
					name="types"
					value="Hollow-Shaft"
					onClick={change2}
				/>
				<div className='ratio' style={{display:dis}}>
					<h6>Diameter Ratio(inner/outer)</h6>
					<input type='text' value={ratio} onChange={handleRatio}/>
				</div>
				<br/><br/><br/><br/><br/>
				<span>On Strength Basis </span>
				<input
					type="radio"
					name="sr"
					value="Strength"
					onClick={change2}
				/>
				<span>On Rigidity Basis </span>
				<input
					type="radio"
					name="sr"
					value="Rigid"
					onClick={change2}
				/>
			</div>
			<div className="I1">
				<h1>Input Fields</h1>
				<lable>Enter Length Of Shaft (mm):</lable>
				<input type="text" value={shaft.Ls} name="Ls" onChange={changeHandle} />
				<lable>Distance Between Shaft(mm):</lable>
				<input
					type="text"
					value={shaft.DstbSup}
					name="DstbSup"
					onChange={changeHandle}
				/>
				<lable>Enter Horizontal Transeverse Load One by One(KN)</lable>
				<input
					type="text"
					onKeyDown={(e) => e.key === 'Enter' && handle(e.target.value)}
				/>
				<lable>Distance From The Left Support(mm) </lable>
				<input
					type="text"
					onKeyDown={(e) => e.key === 'Enter' && handle3(e.target.value)}
				/>
				<lable>Enter Vertical Transeverse Load One by One(KN)</lable>
				<input
					type="text"
					onKeyDown={(e) => e.key === 'Enter' && handle2(e.target.value)}
				/>
				<lable>Distance From The Left Support(mm) </lable>
				<input
					type="text"
					onKeyDown={(e) => e.key === 'Enter' && handle4(e.target.value)}
				/>
				<lable>Twisting Moment(Nm) </lable>
				<input type="text" value={twiMoment} onChange={twihandle} />
				<lable>Maximum Bending Moment(Nm)</lable>
				<input type="text" value={Maxbm} onChange={bmHandle} />
				<button onClick={Diameter}>Go</button>
			</div>
		</div>
		<div className='rg' style={{display:dis2}}><h1>Rigidity inputs</h1>
			<span>Angle Of Twist(deg)</span>
			<input type="text" value={aot} name='aot' onChange={handleaot}/>
			<span>Modulus Of Rigidity(MPa)</span>
			<input type="text" value={mor} name='mor' onChange={handlemor}/>
			</div>
			<div className='st' style={{display:dis3}}>
				<h5>Do You Want to Design As Per ASME</h5>
				<input type='radio' value='Yes' name='asme' onClick={asmeopen}/><span>Yes</span>
				<input type="radio" value='No'  name='asme' onClick={asmeclose}/><span>No</span>

				<span className='sp'>Moment Factor</span>
				<input type='text'className='ia' value={mf} name='mf' onChange={handlemf}/>
				<span className='sp'>Twisting Factor</span>
				<input type='text' className='ia' value={tf} name='mf' onChange={handletf}/>
				<div className='asme' style={{display:dis4}}>
                <h1>Input Fields</h1>
				<span>Yield Tensile Strength(MPa):- &nbsp;</span>
				<input type="text" name='yts' value={asme.yts} onChange={handleasme}/>
				<span>Ultimate Tensile Strength(MPa):- &nbsp;</span>
				<input type="text" name='uts' value={asme.uts} onChange={handleasme}/>
				<span>Factor Of Safety:- &nbsp;</span>
				<input type="text" name='fos' value={asme.fos} onChange={handleasme}/>
				</div>
				<div className='asmeno' style={{display:dis5}}>
                <h1>Input Fields</h1>
				<span>Yield Tensile Strength(MPa):- &nbsp;</span>
				<input type="text" name='yts' value={asme.yts} onChange={handleasme}/>
				<span>Factor Of Safety:- &nbsp;</span>
				<input type="text" name='fos' value={asme.fos} onChange={handleasme}/>
				</div>
			</div>
			</>
	);
}

export default Shaft;
