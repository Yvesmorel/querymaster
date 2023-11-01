import './styles/Dashboard.scss';
import Image from 'next/image';
import dbLogo from './logo/dbLogo.png';
import DashboardNavbar from './components/DashboardNavbar';
import { Button, Avatar, message } from 'antd';
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '@/app/AppContextProvider';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

// import Bard from "bard-ai";
const Dashboard = () => {
    const router = useRouter();
    const { currentUser } = useContext(AppContext);
    // const getBardRes = async () => {
    //     let myBard = new Bard(process.env.BARDAI);
    //     console.log(await myBard.ask("Hello, bard!"));
    // }

    useEffect(() => {
        if (!currentUser) {
            router.replace('/');
        }
        console.log(currentUser);
    }, [currentUser])

    return (
        <div className='dashboard'>
            <DashboardLeft />
            <DashboardRight />
        </div>
    );
};

const DashboardLeft = () => {
    const { signOut } = useContext(AppContext);
    const userSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            message.error(error.message);
        }
    }
    return (
        <div className='dashboardLeft'>
            <div className='top'>
                <div className='logo'>
                    <Image src={dbLogo} width={25} alt='logo' /><label>dbquerymaster.ai</label>
                </div>
                <DashboardNavbar />
            </div>
            <div className='bottom'>
                <label className='plan'>FREE</label>
                <Button className='signOut' onClick={() => userSignOut()}><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faRectangleXmark} /><label>Sign out</label></Button>
            </div>
        </div>
    );
};

const DashboardRight = () => {
    const { selectedItem, selectedGenerator, setSelectedGenerator, aiGeneratorNavbar, currentUser } = useContext(AppContext);
    const handleSelectedGenerator = (currentGenerator) => {
        setSelectedGenerator(currentGenerator);
    }

    return (
        <div className='dashboardRight'>
            <div className='top'>
                <div className='version'>
                    @Bêta-Support only English
                </div>
                {/* <div className='aiGeneratorNavbar' style={selectedItem.text === 'AI Generator' ? {} : { visibility: 'hidden' }}>
                    {
                        aiGeneratorNavbar.map((item, i) => <div onClick={() => handleSelectedGenerator(item)} key={i} className={item === selectedGenerator ? 'item itemActive' : 'item'}>{item}</div>)
                    }
                </div> */}
                <div className='profile'>
                    <label className='username'>{currentUser?.displayName}</label>
                    <Avatar shape='square' src={currentUser?.photoURL} style={{ backgroundColor: '#635BFF', color: "", verticalAlign: 'middle',fontWeight:'bold' }} size="large">
                        {currentUser?.displayName[0].toUpperCase()}
                    </Avatar>
                </div>
            </div>
            <div className="bottom">
                {selectedItem.component}
            </div>
        </div>
    );
};

export default Dashboard;