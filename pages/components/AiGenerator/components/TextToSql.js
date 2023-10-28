import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '@/app/AppContextProvider';
import '../styles/typingAnimation.scss';
import AI from '../../../images/AIBOT.gif'
import Image from 'next/image';
import { Input, Select, Button, Spin, message, Modal } from 'antd';
import { Databases } from '../Tables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { SendOutlined, CopyOutlined } from '@ant-design/icons'
import run from '../icons/run.svg';
import copy from '../icons/copy.svg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import paraisoLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/paraiso-light';
// import monoBlue from 'react-syntax-highlighter/dist/cjs/styles/hljs/mono-blue';
// import a11yLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light';
// import anOldHope from 'react-syntax-highlighter/dist/cjs/styles/hljs/an-old-hope';
// import atelierCaveLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-cave-light';
import atelierForestLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-forest-light';
import atelierSulphurpoolLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-sulphurpool-light';
import CodeEditor from './CodeEditor';


import { getQuery } from '@/functions/GetQuery';
import { addQuery } from '@/functions/AddQuery';
import { getSQL } from '@/functions/OpenaiRequest';
import { wordAllow } from '../Tables';
import { convertToSQLite } from '@/functions/ConvertToSQLite';
import { runSQL } from '@/functions/RunSQL';
import { OptimizeQuery } from '@/functions/OptimizeQuery';

import TypedAndPrims from './TypeAndPrism';
import axios from 'axios';
import Typist from 'react-typist';
import TypingAi from './TypingAi';
const { Option } = Select;
const { TextArea } = Input;
const selectSchemaStyle = {
    background: "white",
    color: '#635BFF',
    width: '150px',
    textAlign: 'center',
    border: 'none',
    borderRadius: '0px',
    boxShadow: "0px 12px 26px 0px rgba(16, 30, 115, 0.06)",
    borderRadius: '5px',
    marginRight: '5px'
}

const TextToSql = () => {
    const [sendSpinner, setSendSpinner] = useState(false);
    const [optimizedSpinner, setOptimizedSpinner] = useState(false);
    const [runSpinner, setRunSpinner] = useState(false);
    const [typing, setTyping] = useState()
    const [expand, setExpand] = useState(false);
    const [runRes, setRunRes] = useState([]);
    const [alreadyGenerate, setAlreadyGenerate] = useState(false)
    const { jsonResult, setJsonResult, database, setDatabase, ia, setIa, human, setHuman, schemaList, setHumanschemaList, setSchemaList, schema, setSchema, selectedDatabase, setSelectedDatabase, runResult, setRunResult } = useContext(AppContext);



    // useEffect(() => {
    //     if (ia !== "") {
    //         handleTyping(ia);
    //     }

    // }, [ia])


    // function SQLCodeComponent(sqlCode) {
    //     return (



    //     );
    // }
    const Copy = (requete) => {

        if (requete) {
            // 2. On copie le texte dans le presse-papier
            navigator.clipboard.writeText(requete).then(() => {
                message.success('copied');
            });
        } else {
            message.error('No text to copy.');
        }
    };


    return (

        <div className='textToSql'>
            <div className='request'>
                <TextArea rows={4} onChange={(e) => setHuman(e.target.value)} className='requestTop' placeholder='What ara you thinking?' />
                <div className='requestBottom'>
                    <div className="human">HUMAN</div>
                    <div className='requestBottomRight'>

                        <Select dropdownStyle={{ optionSelectedColor: '#635BFF' }} options={Databases} bordered={false} defaultValue={Databases[0].label} className='databases' onChange={(value) => setDatabase(value)} />
                        <Button loading={sendSpinner} icon={<SendOutlined style={{ color: '#635BFF' }} />} className='send' onClick={() => getQuery(axios, setSendSpinner, human, wordAllow, database, message, setIa, addQuery, getSQL, selectedDatabase, schemaList, setTyping)}>SEND</Button>


                    </div>
                </div>
            </div>
            <Image width={80} src={AI} alt="" className='ai' />
            <div className="response">
                <div className='responseTop'>
                    {ia === "" ? "" : <CodeEditor ia={ia} setIa={setIa} />}
                    {/* <CodeEditor /> */}
                </div>
                <div className='responseBottom'>
                    <div className='ai'>AI</div>
                    <div className='responseBottomRight'>

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

                        <Button icon={<FontAwesomeIcon icon={faExpand} />} className='run' onClick={() => setExpand(true)}>EXPAND</Button>
                        <Button loading={runSpinner} icon={<Image width={15} src={run} alt='run' />} className='run' onClick={() => convertToSQLite(setRunSpinner, ia, axios, message, runSQL, selectedDatabase, schemaList, runResult, setRunResult)}>RUN</Button>
                        <Button icon={<CopyOutlined style={{ color: '#635BFF' }} alt='copy' />} className='copy' onClick={() => Copy(ia)}>COPY</Button>
                    </div>
                </div>
            </div>
            <Modal
                width={800}
                open={expand}
                title="Manage schema"
                onCancel={() => setExpand(!expand)}
                footer={[
                    <Button key={"run"} loading={runSpinner} icon={<Image width={15} src={run} alt='run' />} className='run' onClick={() => {
                        setExpand(false);
                        convertToSQLite(setRunSpinner, ia, axios, message, runSQL, selectedDatabase, schemaList, runResult, setRunResult);
                    }}>RUN</Button>,
                    <Button key='optimize' loading={optimizedSpinner} onClick={() => OptimizeQuery(selectedDatabase,schemaList,axios,ia, database, message, setIa,wordAllow,setOptimizedSpinner)}>
                        Optimize
                    </Button>,
                    <Button key={'back'} type="primary" onClick={() => setExpand(!expand)}>
                        Back
                    </Button>,

                ]}
            >
                <CodeEditor ia={ia} setIa={setIa} />

            </Modal>

        </div>

    );
};

export default TextToSql;