import React from 'react'
import '../CSS/Home.css'
import {Link } from 'react-router-dom';
function Home() {
  return (
    <div className='home'>
    <div className='h1'>
        <h1>COMPUTER AIDED DESIGN OF SHAFT AND AXLE</h1>
        <div className="list">
            <h4><u>Project Members</u></h4>
            <ul>
                <li>Jatin Prasad Tandan (2019BMEC033)</li>
                <li>Rupesh Kumar (2019BMEC038)</li>
                <li>Keshav Kumar Jha (2019BMEC040)</li>
                <li>Adarsh Jaiswal (2019BMEC035)</li>
                <li>Saurabh Gupta (2019BELE048)</li>
            </ul>
            
        </div>
        <h3>Under the guidence of <b>Prof. Rakesh Sehgal and  Dr. Mukund Dutt Sharma</b></h3>
        <Link to='/Design'><button>Proceed</button></Link>
    </div>
    </div>
  )
}

export default Home