export const ParseSql = (schema, axios,addSchema,setSchemaSpinner,message,userId,fileName,schemaList) => {

    setSchemaSpinner(true);
    let verifDouble=schemaList.filter(schema=>schema.fileName===fileName);
    if (verifDouble.length>0) {
        message.info('this data source already exist.')
        setSchemaSpinner(false);
        return;
    }
    axios({
        url: 'https://querymasterapi-moreldev.onrender.com/parseSql',
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
            console.dir(error)
            setSchemaSpinner(false);
        });

}