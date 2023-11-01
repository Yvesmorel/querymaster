'use client'
import React from 'react';
import { Button } from 'antd';
import Image from 'antd';
import logo from "./db.png"
function Navbar() {
    return (
        <header>
            <div className='headerLeft'>
                <div className='logo' >
                    <Image src={logo} width={25} alt='logo' /><label>dbquerymaster.ai</label>
                </div>
            </div>
            <div className='headerRight'>
                {/* <nav className='navBar'>

            <Link href="#">App</Link>
            <Link href="#">Pricing</Link>

          </nav> */}
                <Button className='signin' onClick={() => console.log("OK")}>SIGN IN</Button>
            </div>
        </header>

    )
}

export default Navbar;