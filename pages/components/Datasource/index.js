
import React, { useState, useContext, useEffect } from 'react';
import './styles/style.scss';
import { Input, Button, Popover, Upload, message, Modal, Spin, List, FloatButton } from 'antd';
import { FileAddOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
import { ParseSql } from '@/functions/ParseSql';
const index = () => {
    const [schemaSpinner, setSchemaSpinner] = useState(false);

    const [schemaName, setSchemaName] = useState("")
    const [previewShema, setPreviewSchema] = useState(false);
    const { schemaList, setSchemaList, schema, setSchema, selectedDatabase, setSelectedDatabase } = useContext(AppContext);
    const [selectedTable, setSelectedTable] = useState(0)
    const [currentTable, setCurrentTable] = useState({ columns: [], values: [] });
    const [searchDatabase, setSearchDatabase] = useState('');
    const [manageSchemaModal, setManageSchemaModal] = useState(false);
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
            iniTializeDataSource(selectedDatabase, selectedTable);
            // getTablesContent(schemaList[selectedDatabase].schema, axios, setCurrentTable, schemaList, selectedDatabase, selectedTable, message);
        }
    }, [schemaList])
    const iniTializeDataSource = (selectedDatabase, selectedTable) => {
        const database = schemaList[selectedDatabase];
        const tableColums = database.columns[selectedTable];
        const tableData = database.data.filter(table => Object.keys(table)[0] === schemaList[selectedDatabase].tableList[selectedTable])[0] || [];
        const tableName = schemaList[selectedDatabase].tableList[selectedTable];
        console.log(tableData, tableName);
        setCurrentTable({ columns: tableColums[tableName], values: tableData[tableName] })
    }
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
        if (file.size > 5000000) {
            message.info('The file must be less than or equal to 79,1 ko.')
            return;
        }
        console.log(file.size)

        reader.onload = (e) => {
            if (e.target.result === "") {
                return;
            }
            const content = e.target.result;
            const sqlQuery = content
            if (sqlQuery.length === 0) {
                return;
            }
            if (processSQLInserts(content)===false) {
                return;
            }
            console.log(processSQLInserts(content).size)
            setSchema(processSQLInserts(content));
            setPreviewSchema(true);
        };
        try {
            reader.readAsText(file['originFileObj']);
        } catch (error) {
            message.error(error.message)
        }

    };
    function limitInsertsToTwoRows(inputString) {
        const inserts = inputString.split('INSERT INTO');
        const limitedInserts = inserts.map((insert, index) => {
            if (index === 0) return insert;
            const lines = insert.split('\n');
            const limitedLines = lines.slice(0, 3); // Récupère les 3 premières lignes (INSERT INTO et les deux lignes de données)
            return limitedLines.join('\n');
        });
        return limitedInserts.join('INSERT INTO');
    }

    function processSQLInserts(sqlString) {
        const create=sqlString.match(/(CREATE TABLE .*?;)/gs);
        const inserts = sqlString.match(/(INSERT INTO .*?;)/gs);
        if (!create) {
            return false;
        }
        let lines=create?.join('');
        inserts.map((insert) => {
          
          const rows=insert.split('\n');
          
          const nbrLines=rows.length
          rows.map((row,i)=>{
            if (i<=9 || i===nbrLines-1) {
                lines+=row+"\n";
            }
          })
        });
      
        return lines.replace(/0x[0-9A-Fa-f]+/g, "0x00");
      }
    // function limitInsertsToTwoRows(sqlText) {
    //     const lines = sqlText.split('\n');
    //     let result = '';
    //     let insertCounter = 0;
    
    //     for (const line of lines) {
    //         if (line.trim().startsWith('INSERT INTO')) {
    //             insertCounter++;
    //             if (insertCounter > 2) {
    //                 result += ');'; // Ferme l'INSERT INTO précédent
    //                 insertCounter = 1; // Réinitialise le compteur
    //             }
    //             if (insertCounter === 1) {
    //                 result += line + '\n'; // Ajoute la première ligne d'INSERT INTO
    //             } else {
    //                 result += line.trim().endsWith(',') ? line.trim() + '\n' : line.trim() + ',\n'; // Ajoute la deuxième ligne d'INSERT INTO
    //             }
    //         } else {
    //             result += line + '\n';
    //         }
    //     }
    
    //     return result;
    // }

    

    const handleClickDatabase = (pos) => {
        setSelectedDatabase(pos);
        setSelectedTable(0);
        iniTializeDataSource(pos, 0);
    }

    return (
        <div className='dataSource'>
            {/* <div className='dataSourceLeft'>
                <Input style={{ margin: '10px' }} onChange={(e) => setSearchDatabase(e.target.value)} placeholder='search schema' />

                <List

                    style={{ flex: 1, overflowY: 'auto', marginTop: '5px', width: '100%', borderRadius: '5px' }}
                    dataSource={schemaList.filter(schema => searchDatabase ? schema.fileName.includes(searchDatabase) : schemaList)}
                    renderItem={(schema, i) => (
                        <Button style={i === selectedDatabase ? databaseActive : { textAlign: 'center', border: 'none', borderRadius: '0px', width: '100%' }} onClick={() => handleClickDatabase(i)}>
                            {schema.fileName}
                        </Button >
                    )}
                />
                <Popover content={popContent} title="File.sql max size 79,1 ko.">
                    <Upload accept='.sql' onChange={(event) => handleUploadSchema(event)} showUploadList={false}>
                        <Button className='addSchema' icon={schemaSpinner ? <Spin spinning size='small' /> : <FileAddOutlined />} >Add schema</Button>
                    </Upload>
                </Popover>
            </div> */}
            <div className='dataSourceRight'>
                <div className='dataSourceRightTop'>
                    {
                        schemaList.filter((schema, i) => i === selectedDatabase).map((schema, i) => {
                            return schema.tableList.map((table, i) => {
                                return <Button onClick={() => {
                                    console.log(i, schemaList[selectedDatabase].tableList[i]);

                                    setSelectedTable(i)
                                    iniTializeDataSource(selectedDatabase, i);
                                    // getTablesContent(schemaList[selectedDatabase].schema, axios, setCurrentTable, schemaList, selectedDatabase, i, message);
                                }} style={i === selectedTable ? { color: '#635BFF' } : {}} className='tables' key={i}>{table}</Button>
                            })
                        })
                    }
                </div>
                <div className='dataSourceRightBottom'>
                    <TABLE columns={currentTable.columns} data={currentTable.values}  height={"80vh"} />
                </div>
            </div>
            <Modal
                width={800}
                open={previewShema}
                title="Conpile your schema"
                onCancel={() => setPreviewSchema(!previewShema)}
                footer={[
                    <Button key="submit" type="primary" loading={schemaSpinner} onClick={() => ParseSql(schema, axios, addSchema, setSchemaSpinner, message, "ZEfggj7u6EOX61hIrkeZc2EEwl93", schemaName, schemaList)}>
                        Compile
                    </Button>,
                ]}
            >
                <div className='previewSchema' style={{ height: '60vh', overflowY: 'auto' }}>
                    {SQLCodeComponent(schema)}
                </div>

            </Modal>
            <Modal
                width={800}
                open={manageSchemaModal}
                title="Manage schema"
                onCancel={() => setManageSchemaModal(!manageSchemaModal)}
                footer={[
                    <Button type="primary" onClick={() => setManageSchemaModal(!manageSchemaModal)}>
                        Back
                    </Button>,
                ]}
            >
                <Input style={{ margin: '10px' }} onChange={(e) => setSearchDatabase(e.target.value)} placeholder='search schema' />

                <List

                    style={{ flex: 1, overflowY: 'auto', marginTop: '5px', width: '100%', borderRadius: '5px' }}
                    dataSource={schemaList.filter(schema => searchDatabase ? schema.fileName.includes(searchDatabase) : schemaList)}
                    renderItem={(schema, i) => (
                        <Button key={i} style={i === selectedDatabase ? databaseActive : { textAlign: 'center', border: 'none', borderRadius: '0px', width: '100%' }} onClick={() => handleClickDatabase(i)}>
                            {schema.fileName}
                        </Button >
                    )}
                />

            </Modal>
            <FloatButton.Group style={{ right: 9, bottom: 9 }} shape="square" className='floatButton'>
                <FloatButton onClick={() => setManageSchemaModal(true)} shape='square' className='manage' icon={<UnorderedListOutlined />} tooltip={<div>Manage schema</div>} />
                <Popover content={popContent} title="File.sql max size 79,1 ko.">
                    <Upload accept='.sql' onChange={(event) => handleUploadSchema(event)} showUploadList={false}>
                        <FloatButton shape='square' className='add' icon={<FileAddOutlined style={{ color: '#635BFF' }} />} />
                    </Upload>
                </Popover>
            </FloatButton.Group>
        </div>
    );
};
// schemaToSQLite(schema, axios, message, "ZEfggj7u6EOX61hIrkeZc2EEwl93", addSchema, schemaName, setSchemaSpinner, getTables)
export default index;