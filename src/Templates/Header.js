import React from 'react'
import {Link } from 'react-router-dom';
function Header(props) {
  
  return (
    <div className='hed'>
        <Link to='/Design/Shaft'><span style={{color:props.clo1}}>Shaft</span></Link>
        <Link to='/Design/Axle'><span style={{color:props.clo2}}>Axle</span></Link>
    </div>
  )
}

export default Header