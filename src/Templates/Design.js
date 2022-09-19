import React from 'react'
import '../CSS/design.css'
import {Link } from 'react-router-dom';
function Design() {
  return (
    <div className='d'>
    <div className='d1'>
        <h1>
         What You Want To Design ?
        </h1>
        <ul>
        <li><Link className='de' to='/Design/Shaft'>Shaft</Link></li>
        <li><Link className='de' to='/Design/Axle'>Axle</Link></li>
        </ul>
    </div>
    </div>
  )
}

export default Design