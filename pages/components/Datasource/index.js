import React, { useState, useContext, useEffect } from 'react';
import './styles/style.scss';
import { Input, Button, Popover, Upload, message, Modal, Spin, List } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { schemaToSQLite } from '@/functions/SchemaToSQLite';
import { addSchema } from '@/functions/AddSchema';
import axios from 'axios';
import { getSchema } from '@/functions/GetSchema';
import { AppContext } from '@/app/AppContextProvider';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atelierForestLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-forest-light';
const index = () => {
    const [schemaSpinner, setSchemaSpinner] = useState(false);
    const [schemaName, setSchemaName] = useState("")
    const [previewShema, setPreviewSchema] = useState(false);
    const { schemaList, setSchemaList, schema, setSchema } = useContext(AppContext);
    useEffect(() => {
        getSchema("ZEfggj7u6EOX61hIrkeZc2EEwl93", setSchemaList);
    }, [])
    const popContent = (
        <div>
            <p>Select your database SQL file.</p>
        </div>
    );
    function SQLCodeComponent(sqlCode) {
        return (
            <SyntaxHighlighter showLineNumbers style={atelierForestLight} lineNumberContainerStyle={{ backgroundColor: "#0DD1ADE8", fontSize: '10px' }} wrapLines language="sql" customStyle={{ margin: '0px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', fontSize: '14px', textAlign: 'justify', color: '#0DD1ADE8', backgroundColor: 'rgb(248 249 251)' }}>
                {sqlCode}
            </SyntaxHighlighter>
        );
    }
    const handleUploadSchema = ({ file }) => {
        setSchemaName(file.name)
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            setSchema(content);
            setPreviewSchema(true);
        };
        try {
            reader.readAsText(file['originFileObj']);
        } catch (error) {
            message.error('error');
        }

    };
    return (
        <div className='dataSource'>
            <div className='dataSourceLeft'>
                <Input style={{ marginBottom: '5px' }} placeholder='search schema' />
                <Popover content={popContent} title="File.sql">
                    <Upload accept='.sql' onChange={(event) => handleUploadSchema(event)} showUploadList={false}>
                        <Button className='addSchema' icon={schemaSpinner ? <Spin spinning size='small' /> : <FileAddOutlined />} style={{ width: '100%' }}>Add schema</Button>
                    </Upload>
                </Popover>
                <List
                style={{flex:1,overflowY:'auto',marginTop:'5px'}}
                    dataSource={schemaList}
                    renderItem={(schema) => (
                        <List.Item>
                            {schema.fileName}
                        </List.Item>
                    )}
                />
            </div>
            <div className='dataSourceRight'>
                Select data source
            </div>
            <Modal
                width={800}
                open={previewShema}
                title="Conpile your schema"
                onCancel={() => setPreviewSchema(!previewShema)}
                footer={[
                    <Button key="submit" type="primary" loading={schemaSpinner} onClick={() => schemaToSQLite(schema, axios, message, "ZEfggj7u6EOX61hIrkeZc2EEwl93", addSchema, schemaName, setSchemaSpinner)}>
                        Compile
                    </Button>,
                ]}
            >
                <div className='previewSchema' style={{ height: '60vh', overflowY: 'auto' }}>
                    {SQLCodeComponent(schema)}
                </div>

            </Modal>
        </div>
    );
};

export default index;