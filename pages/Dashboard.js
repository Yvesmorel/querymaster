import './styles/Dashboard.scss';
import Image from 'next/image';
import dbLogo from './logo/dbLogo.png';
import DashboardNavbar from './components/DashboardNavbar';
import { Button, Avatar } from 'antd';
import React, { useState, useContext } from 'react';
import { AppContext } from '@/app/AppContextProvider';
const Dashboard = () => {
    return (
        <div className='dashboard'>
            <DashboardLeft />
            <DashboardRight />
        </div>
    );
};

const DashboardLeft = () => {
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
                <Button className='signOut'>Sign out</Button>
            </div>
        </div>
    );
};

const DashboardRight = () => {
    const { selectedItem, selectedGenerator, setSelectedGenerator, aiGeneratorNavbar } = useContext(AppContext);
    const handleSelectedGenerator = (currentGenerator) => {
        setSelectedGenerator(currentGenerator);
    }
    return (
        <div className='dashboardRight'>
            <div className='top'>
                <div className='version'>
                    @Bêta
                </div>
                <div className='aiGeneratorNavbar' style={selectedItem.text === 'AI Generator' ? {} : { visibility: 'hidden' }}>
                    {
                        aiGeneratorNavbar.map((item, i) => <div onClick={() => handleSelectedGenerator(item)} key={i} className={item === selectedGenerator ? 'item itemActive' : 'item'}>{item}</div>)
                    }
                </div>
                <div className='profile'>
                    <label className='username'>username</label>
                    <Avatar style={{ backgroundColor: "#635BFF", verticalAlign: 'middle' }} size="large">
                        U
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