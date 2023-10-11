import React, { useState, useContext } from 'react';
import './styles/style.scss';
import { AppContext } from '@/app/AppContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';


const index = () => {
    const { navbarItems, selectedItem, setSelectedItem } = useContext(AppContext);

    const handleNavigate = (currentItem) => {
        setSelectedItem(currentItem);
    }


    return (
        <div className='navbar'>
            {
                navbarItems?.map((currentItem, i) => {
                    return (
                        <Link href="#" key={i} className={selectedItem.text === currentItem.text ? 'navItem itemActive' : 'navItem'} onClick={() => handleNavigate(currentItem)}>
                            <div className='iconCont'>
                                <FontAwesomeIcon icon={currentItem.icon} width={40} height={40} />
                            </div>
                            <label>{currentItem.text}</label>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default index;