import Image from 'next/image';
import Link from 'next/link';
import './homeStyles/styles.scss';
import { Button } from 'antd';
import logo from '../pages/logo/dbLogo.png';
import AI from "../pages/images/AIBOT.gif";
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
          <Button className='version'>
            @Bêta
          </Button>
          <h1 className='Title'>
            Easily turn natural language into SQL QUERY
          </h1>
          <p className='info'>
            An innovative online tool that enables users to effortlessly
            convert their natural language into SQL queries.
          </p>
          <Button className='getStarted'>GET STARTED</Button>
          <p className='dataBase'>
            Get queries for
          </p>
        </div>
        <div className='bodyRight'>
          <div className="top">
            <div className='human'>
              <div className='humanTop'>

              </div>
              <div className='humanBottom'>
                <div className='Human'>HUMAN</div>
              </div>
            </div>
            <div className='ai'>
              <div className='aiTop'>

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
