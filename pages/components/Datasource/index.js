import React from 'react';
import './styles/style.scss';
import { Input, Button, Popover } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
const index = () => {
    const popContent = (
        <div>
          <p>Select your database SQL file.</p>
        </div>
      );
    return (
        <div className='dataSource'>
            <div className='dataSourceLeft'>
                <Input style={{ marginBottom: '5px' }} placeholder='search schema' />
                <Popover content={popContent} title="File.sql">
                    <Button icon={<FileAddOutlined />} style={{ width: '100%' }}>Add schema</Button>
                </Popover>
            </div>
            <div className='dataSourceRight'>
                Select data source
            </div>
        </div>
    );
};

export default index;