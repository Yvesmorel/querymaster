import './styles/Dashboard.scss';
import Image from 'next/image';
import dbLogo from './logo/dbLogo.png';
import DashboardNavbar from './components/DashboardNavbar';
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
                    <Image src={dbLogo} width={25} /><label>dbquerymaster.ai</label>
                </div>
                <DashboardNavbar />
            </div>
        </div>
    );
};

const DashboardRight = () => {
    return (
        <div className='dashboardRight'>
           
        </div>
    );
};

export default Dashboard;