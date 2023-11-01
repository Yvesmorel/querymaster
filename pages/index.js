import Image from 'next/image';
import Link from 'next/link';
import './homeStyles/styles.scss';
import { Button, message } from 'antd';
import logo from '../pages/logo/dbLogo.png';
import AI from "../pages/images/AIBOT.gif";
import IaResponse from './homeComponents/IaResponse.png';
import turn from './homeComponents/turn.png';
import sqlQuery from './homeComponents/sqlQuery.png';
import db from './homeComponents/db.png';
import version from './homeComponents/version.png';
import { useContext,useEffect } from 'react';
import { AppContext } from '@/app/AppContextProvider';
import { useRouter } from 'next/navigation';
import { getRedirectResult,GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
export default function Home() {
    const router = useRouter();
    const { signIn, currentUser,loadingData } = useContext(AppContext)
    if(currentUser) {
        router.replace('/Dashboard');
    }
    const userSignIn = async () => {
        try {
            await signIn();
         
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        getRedirectResult(auth)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                 
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.dir(errorMessage);

            });
    }, [])
    
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

                        {/* <Link href="#">App</Link>
                        <Link href="#">Pricing</Link> */}

                    </nav>
                    <Button loading={loadingData} className='signin' onClick={()=>userSignIn()}>SIGN IN</Button>
                </div>
            </header>
            <div className='body'>
                <div className='bodyLeft'>
                    <Image src={version} className='version' width={90} alt='version' />
                    <Image src={turn} className='turn' width={500} alt='res' />
                    <Image src={sqlQuery} width={300} className='sqlQuery' alt='res' />
                    <p className='info'>
                        An innovative online tool that enables users to effortlessly
                        convert their natural language into SQL queries.
                    </p>
                    <Button className='getStarted' onClick={()=>userSignIn()}>GET STARTED</Button>
                    <p className='dataBase'>
                        Get queries for
                    </p>
                    <Image src={db} className='db' width={250} alt='dataBase' />
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