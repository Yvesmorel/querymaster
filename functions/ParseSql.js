export const ParseSql = (schema, axios,addSchema,setSchemaSpinner,message,userId,fileName,schemaList) => {

    setSchemaSpinner(true);
    let verifDouble=schemaList.filter(schema=>schema.fileName===fileName);
    if (verifDouble.length>0) {
        message.info('this data source already exist.')
        setSchemaSpinner(false);
        return;
    }
    axios({
        url: 'http://localhost:3001/parseSql',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.RUNSQL,
        },
        data: {
            schema: schema,
        },
    })
        .then(({ data }) => {
           console.log(data)
           addSchema(data.create,data.insert, userId, message, fileName, setSchemaSpinner,data.tableContent,data.tableList); 
        })
        .catch(function (error) {
            message.error(error)
            setSchemaSpinner(false);
        });

}