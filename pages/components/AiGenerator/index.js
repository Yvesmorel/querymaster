import React from 'react';
import './styles/style.scss';
import TextToSql from './components/TextToSql';
import SqlToText from './components/SqlToText';
const index = () => {
    return (
        <div className='aiGenerator'>
            <div className='aiGeneratorTop'>
                <TextToSql />
            </div>
            <div className="aiGeneratorBottom">
                <div className="runSql">
                   <label>No data(connect your database)</label>
                </div>
            </div>
        </div>
    );
};

export default index;