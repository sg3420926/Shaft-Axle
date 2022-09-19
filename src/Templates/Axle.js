import React, { useState } from 'react';
import Header from './Header';
import '../CSS/axle.css';
function Axle() {
	const [ax, setAx] = useState({ La: '', yts: '', uts: '', fos: '' });
	const [axle, setAxle] = useState('');
	const [dis, setDis] = useState('none');
	const [htl, setHtl] = useState([]);
	const [disl, setDisl] = useState([]);
	const [dis2,setDis2] = useState('none');
	const [mbment, setMbment] = useState('');
	const [result, setResult] = useState();
	const [mf, setMf] = useState('');
	const handlemf = (e) => {
		setMf(e.target.value);
	};
	const mbHandle = (e) => {
		setMbment(e.target.value);
	};
	const change2 = (e) => {
		setAxle(e.target.value);
		if (e.target.value === 'Rotating') {
			setDis('block');
		} else {
			setDis('none');
		}
	};
	const handle = (e) => {
		setHtl([...htl, e]);
		alert(e);
	};
	const handle3 = (e) => {
		setDisl([...disl, e]);
		alert(e);
	};
	const handleChange = (e) => {
		setAx({ ...ax, [e.target.name]: e.target.value });
	};
	const Diameter = () => {
		const m = [];
		const di = [];
		let r2 = 0;
		let r1;
		let maxi;
		if (mbment !== '') {
			maxi = mbment;
		} else {
			let dbs = Number(ax.La);
			for (let i = 0; i < disl.length; i++) {
				r2 = r2 + Number(disl[i]) * Number(htl[i]);
			}
			r2 = r2 / Number(dbs);
			let s = 0;
			for (let i = 0; i < disl.length; i++) {
				s = s + Number(htl[i]);
			}
			r1 = s - r2;

			for (let j = 0; j < disl.length; j++) {
				let mment = r1 * Number(disl[j]);
				for (let k = 0; k < di.length; k++) {
					mment = mment - Number(htl[k]) * (Number(disl[j]) - Number(di[k]));
				}
				m.push(mment);
				di.push(disl[j]);
			}
			maxi = Math.max.apply(null, m);
			setMbment(maxi)
		}
		if (axle === 'Rotating') {
			let m2 = [];
			m2.push(0.6 * Number(ax.yts));
			m2.push(0.36 * Number(ax.uts));
			let mim = Math.min.apply(null, m2);
			let d = (32 * mf * maxi * 1000) / (Math.PI * mim);
			d = d ** (1 / 3);
			setResult(d);
			setDis2('block')
		}
		if (axle === 'Stationary') {
			let m2 = [];
			m2.push(0.6 * Number(ax.yts));
			m2.push(0.36 * Number(ax.uts));
			let mim = Math.min.apply(null, m2);
			let d = (32 * maxi * 1000) / (Math.PI * mim);
			d = d ** (1 / 3);
			setResult(d);
			setDis2('block')
		}
	};
	const popdown=()=>{
		setDis2('none')
	}
	return (
		<div className="sh">
			<div id="myModal" className="modal" style={{ display: dis2 }}>
				<div className="modal-content">
					<span className="close" onClick={popdown}>
						&times;
					</span>
					<span className="re">Maximum Bending Moment Is :- {mbment}Nm</span>
					<span className="re">Diameter of Axle :- {result}mm</span>
					
					
				</div>
			</div>
			<div className="s1">
				<Header clo1={'white'} clo2={'black'} />
				<h1>
					<u>Axle Design :</u>
				</h1>
				<span for="types">Rotating</span>
				<input type="radio" name="types" value="Rotating" onClick={change2} />
				<div className="inp" style={{ display: dis }}>
					<h5>Moment Faotor</h5>
					<input type="text" value={mf} onChange={handlemf} />
				</div>
				<span for="a1">Stationary</span>
				<input type="radio" name="types" value="Stationary" onClick={change2} />
			</div>
			<div className="I1">
				<h1>Input Fields</h1>
				<lable>Enter Length Of Axle (mm):</lable>
				<input type="text" value={ax.La} name="La" onChange={handleChange} />

				<lable>Enter Transeverse Load One by One(KN)</lable>
				<input
					type="text"
					onKeyDown={(e) => e.key === 'Enter' && handle(e.target.value)}
				/>
				<lable>Distance From The Left Support(mm) </lable>
				<input
					type="text"
					
					onKeyDown={(e) => e.key === 'Enter' && handle3(e.target.value)}
				/>
				<lable>Maximum Bending Moment(Nm)</lable>
				<input type="text" value={mbment} onChange={mbHandle} />
				<lable>Yield Tensile Strength(MPa)</lable>
				<input type="text" value={ax.yts} name="yts" onChange={handleChange} />
				<lable>Ultimate Tensile Strength(MPa)</lable>
				<input type="text" value={ax.uts} name="uts" onChange={handleChange} />
				<lable>Factor of Safety</lable>
				<input type="text" value={ax.fos} name="fos" onChange={handleChange} />
				<button onClick={Diameter}>Go</button>
			</div>
		</div>
	);
}

export default Axle;
