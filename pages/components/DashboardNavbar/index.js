import React, { useState } from 'react';
import './styles/style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faNetworkWired, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const index = () => {
    const [navbarItems] = useState([{ text: 'AI Generator', icon: faRobot }, { text: 'Data source', icon: faNetworkWired }, { text: 'Pricing', icon: faMoneyCheck }]);
    const [selectedItemText,setSelectedItemText]=useState(navbarItems[0].text)
    const handleNavigate=(currentItemText)=>{
        setSelectedItemText(currentItemText);
    }
    return (
        <div className='navbar'>
            {
                navbarItems.map(({ text, icon }, i) => {
                    return (
                        <Link href="#" key={i} className={selectedItemText===text?'navItem itemActive':'navItem'} onClick={()=>handleNavigate(text)}>
                            <div className='iconCont'>
                                <FontAwesomeIcon icon={icon} width={40} height={40} />
                            </div>
                            <label>{text}</label>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default index;