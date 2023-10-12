import React from 'react';
import AI from '../../../images/AIBOT.gif'
import Image from 'next/image';
import { Input, Select, Button } from 'antd';
import { Databases } from '../Tables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SendOutlined, CopyOutlined } from '@ant-design/icons'
import run from '../icons/run.svg';
import copy from '../icons/copy.svg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// import paraisoLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/paraiso-light';
// import monoBlue from 'react-syntax-highlighter/dist/cjs/styles/hljs/mono-blue';
// import a11yLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light';
// import anOldHope from 'react-syntax-highlighter/dist/cjs/styles/hljs/an-old-hope';
// import atelierCaveLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-cave-light';
import atelierForestLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-forest-light';
import atelierSulphurpoolLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-sulphurpool-light';


const { TextArea } = Input;
const TextToSql = () => {
    function SQLCodeComponent() {
        const sqlCode = `SELECT * FROM EMPLOYEE WHERE dept = 'Sales';`;
        return (
            <SyntaxHighlighter style={atelierSulphurpoolLight} lineNumberContainerStyle={{ backgroundColor: "#0DD1ADE8", fontSize: '10px' }} wrapLines language="sql" customStyle={{ margin: '0px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', fontSize: '14px', textAlign: 'justify', color: '#0DD1ADE8', backgroundColor: 'rgb(248 249 251)' }}>
                {sqlCode}
            </SyntaxHighlighter>
        );
    }


    return (

        <div className='textToSql'>
            <div className='request'>
                <TextArea rows={4} className='requestTop' placeholder='What ara you thinking?' />
                <div className='requestBottom'>
                    <div className="human">HUMAN</div>
                    <div className='requestBottomRight'>

                        <Select dropdownStyle={{ optionSelectedColor: '#635BFF' }} options={Databases} bordered={false} defaultValue={Databases[0].label} className='databases' />
                        <Button icon={<SendOutlined style={{ color: '#635BFF' }} />} className='send'>SEND</Button>


                    </div>
                </div>
            </div>
            <Image width={80} src={AI} alt="" className='ai' />
            <div className="response">
                <div className='responseTop'>
                    {SQLCodeComponent()}
                </div>
                <div className='responseBottom'>
                    <div className='ai'>AI</div>
                    <div className='responseBottomRight'>
                        <Button icon={<Image width={15} src={run} alt='run' />} className='run'>RUN</Button>
                        <Button icon={<CopyOutlined style={{ color: '#635BFF' }} alt='copy' />} className='copy'>COPY</Button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default TextToSql;