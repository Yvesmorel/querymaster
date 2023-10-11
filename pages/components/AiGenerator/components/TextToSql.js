import React from 'react';
import AI from '../../../images/AIBOT.gif'
import Image from 'next/image';
const TextToSql = () => {
    return (
        <div className='textToSql'>
            <div className='request'>

            </div>
            <Image width={80} src={AI} alt="" className='ai' />
            <div className="response">

            </div>

        </div>
    );
};

export default TextToSql;