import React, { useContext, useEffect, useState } from 'react';
import './styles/style.scss';
import TextToSql from './components/TextToSql';
import SqlToText from './components/SqlToText';
import { Select } from 'antd';
import { AppContext } from '@/app/AppContextProvider';
import TABLE from '../Datasource/components/Table';
const { Option } = Select;

const index = () => {
    const selectSchemaStyle = {
        background: "white",
        color: '#635BFF',
        width: '200px',
        textAlign: 'center',
        border: 'none',
        borderRadius: '0px',
        boxShadow: "0px 12px 26px 0px rgba(16, 30, 115, 0.06)",
        borderRadius: '5px'
    }
    const { schemaList, setSchemaList, schema, setSchema, selectedDatabase, setSelectedDatabase, runResult, setRunResult } = useContext(AppContext);

    return (
        <div className='aiGenerator'>
            <div className='aiGeneratorTop'>
                <TextToSql />
            </div>
            <div className="aiGeneratorBottom">
                <div className="runSql">
                    <div className='runSqlTop'>
                        {
                            schemaList.length > 0 ?
                                <Select style={selectSchemaStyle} value={selectedDatabase} onChange={(value) => setSelectedDatabase(value)} defaultValue='select your schema' bordered={false}>
                                    {
                                        schemaList.map((schema, i) => {
                                            return <Option key={i} value={i}>{schema.fileName}</Option>
                                        })
                                    }

                                </Select> : ''
                        }

                    </div>
                    <div className='runSqlBottom'>
                        <TABLE columns={runResult.columns} data={runResult.values} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default index;