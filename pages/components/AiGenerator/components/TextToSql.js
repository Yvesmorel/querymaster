import React from 'react';
import AI from '../../../images/AIBOT.gif'
import Image from 'next/image';
import { Input, Select, Button } from 'antd';
import { Databases } from '../Tables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SendOutlined,CopyOutlined } from '@ant-design/icons'
import run from '../icons/run.svg';
import copy from '../icons/copy.svg';
const { TextArea } = Input;
const TextToSql = () => {
    return (
        <div className='textToSql'>
            <div className='request'>
                <TextArea rows={4} className='requestTop' />
                <div className='requestBottom'>
                    <div className="human">HUMAN</div>
                    <div className='requestBottomRight'>
                        <Select options={Databases} bordered={false} defaultValue={Databases[0].label} className='databases' />
                        <Button icon={<SendOutlined style={{ color: '#635BFF' }} />} className='send'>SEND</Button>
                    </div>
                </div>
            </div>
            <Image width={80} src={AI} alt="" className='ai' />
            <div className="response">
                <div className='responseTop'>

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