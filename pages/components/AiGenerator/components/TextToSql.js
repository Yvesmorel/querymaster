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
import atelierSulphurpoolLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-sulphurpool-light';
// import atelierForestLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-forest-light';


const { TextArea } = Input;
const TextToSql = () => {
    function SQLCodeComponent() {
        const sqlCode = `CREATE TABLE plannings (
            Planning_Id int(10) unsigned NOT NULL AUTO_INCREMENT,
            Admin_id int(11) NOT NULL,
            Content int(11) NOT NULL,
            Start_Week text NOT NULL,
            Employe_Id int(11) NOT NULL,
            PRIMARY KEY (Planning_Id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return (
            <SyntaxHighlighter style={atelierSulphurpoolLight} wrapLines language="sql" customStyle={{ margin: '0px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', fontSize: '14px', textAlign: 'justify'}}>
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