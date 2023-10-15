import React, { useState, useContext, useEffect } from 'react';
import './styles/style.scss';
import { Input, Button, Popover, Upload, message, Modal, Spin, List } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { schemaToSQLite } from '@/functions/SchemaToSQLite';
import { addSchema } from '@/functions/AddSchema';
import { getTables } from '@/functions/GetTables';
import axios from 'axios';
import { getSchema } from '@/functions/GetSchema';
import { getTablesContent } from '@/functions/GetTablesContent';
import { AppContext } from '@/app/AppContextProvider';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atelierForestLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atelier-forest-light';
import TABLE from './components/Table';
const index = () => {
    const [schemaSpinner, setSchemaSpinner] = useState(false);
   
    const [schemaName, setSchemaName] = useState("")
    const [previewShema, setPreviewSchema] = useState(false);
    const { schemaList, setSchemaList, schema, setSchema,selectedDatabase, setSelectedDatabase } = useContext(AppContext);
    const [selectedTable, setSelectedTable] = useState(0)
    const [currentTable, setCurrentTable] = useState({columns:[],values:[]});
    // const [tableList, setTableList] = useState(schemaList[0].tables)
    const databaseActive = {
        background: "#F4F4FF",
        color: '#635BFF',
        width: '100%',
        textAlign: 'center',
        border: 'none',
        borderRadius: '0px'
    }
   
    useEffect(() => {
        if (schemaList.length > 0) {
            getTablesContent(schemaList[selectedDatabase].schema, axios, setCurrentTable, schemaList, selectedDatabase, selectedTable, message);
        }
    }, [schemaList])
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

    const handleClickDatabase = (pos) => {
        setSelectedDatabase(pos);
        setCurrentTable({columns:[],values:[]});
        getTablesContent(schemaList[pos].schema, axios, setCurrentTable, schemaList, pos, selectedTable, message);
    }

    return (
        <div className='dataSource'>
            <div className='dataSourceLeft'>
                <Input style={{ margin: '10px' }} placeholder='search schema' />

                <List

                    style={{ flex: 1, overflowY: 'auto', marginTop: '5px', width: '100%', borderRadius: '5px' }}
                    dataSource={schemaList}
                    renderItem={(schema, i) => (
                        <Button style={i === selectedDatabase ? databaseActive : { textAlign: 'center', border: 'none', borderRadius: '0px', width: '100%' }} onClick={() => handleClickDatabase(i)}>
                            {schema.fileName}
                        </Button >
                    )}
                />
                <Popover content={popContent} title="File.sql">
                    <Upload accept='.sql' onChange={(event) => handleUploadSchema(event)} showUploadList={false}>
                        <Button className='addSchema' icon={schemaSpinner ? <Spin spinning size='small' /> : <FileAddOutlined />} >Add schema</Button>
                    </Upload>
                </Popover>
            </div>
            <div className='dataSourceRight'>
                <div className='dataSourceRightTop'>
                    {
                        schemaList.filter((schema, i) => i === selectedDatabase).map((schema, i) => {
                            return schema.tables.map((table, i) => {
                                return <Button onClick={() => {
                                    console.log(i)
                                    setSelectedTable(i)
                                    getTablesContent(schemaList[selectedDatabase].schema, axios, setCurrentTable, schemaList, selectedDatabase, i, message);
                                }} style={i === selectedTable ? { color: '#635BFF' } : {}} className='tables' key={i}>{table}</Button>
                            })
                        })
                    }
                </div>
                <div className='dataSourceRightBottom'>
                    <TABLE columns={currentTable.columns} data={currentTable.values}/>
                </div>
            </div>
            <Modal
                width={800}
                open={previewShema}
                title="Conpile your schema"
                onCancel={() => setPreviewSchema(!previewShema)}
                footer={[
                    <Button key="submit" type="primary" loading={schemaSpinner} onClick={() => schemaToSQLite(schema, axios, message, "ZEfggj7u6EOX61hIrkeZc2EEwl93", addSchema, schemaName, setSchemaSpinner, getTables)}>
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