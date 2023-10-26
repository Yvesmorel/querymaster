'use client'
import Image from 'next/image';
import Link from 'next/link';
import './homeStyles/styles.scss';
import { Button } from 'antd';
import logo from '../pages/logo/dbLogo.png';
import AI from "../pages/images/AIBOT.gif";
import IaResponse from './components/IaResponse.png';
import turn from './components/turn.png';
import sqlQuery from './components/sqlQuery.png';
import db from './components/db.png';
import version from './components/version.png';

export default function Home() {
  return (
    <main className='home'>
      <header>
        <div className='headerLeft'>
          <div className='logo'>
            <Image src={logo} width={25} alt='logo' /><label>dbquerymaster.ai</label>
          </div>
        </div>
        <div className='headerRight'>
          <nav className='navBar'>

            <Link href="#">App</Link>
            <Link href="#">Pricing</Link>

          </nav>
          <Button className='signin'>SIGN IN</Button>
        </div>
      </header>
      <div className='body'>
        <div className='bodyLeft'>
        <Image src={version} className='version' width={90} alt='version' />
          <Image src={turn} className='turn' width={500} alt='res' />
          <Image src={sqlQuery} width={300} className='sqlQuery'  alt='res' />
          <p className='info'>
            An innovative online tool that enables users to effortlessly
            convert their natural language into SQL queries.
          </p>
          <Button className='getStarted'>GET STARTED</Button>
          <p className='dataBase'>
            Get queries for
          </p>
          <Image src={db}  className='db' width={250}  alt='dataBase' />
        </div>
        <div className='bodyRight'>
          <div className="top">
            <div className='human'>
              <div className='humanTop'>
                <p>List of female students
                  over 20 years old.</p>
              </div>
              <div className='humanBottom'>
                <div className='Human'>HUMAN</div>
              </div>
            </div>
            <div className='ai'>
              <div className='aiTop'>
              <Image src={IaResponse} width={200} alt='res' />
              </div>
              <div className='aiBottom'>
                <div className='Ai'>AI</div>
              </div>
            </div>
          </div>
          <div className="center">
            <Image width={80} src={AI} alt="" className='ai' />
          </div>
          <div className='bottom'>

          </div>
        </div>
      </div>
    </main>
  )
}
