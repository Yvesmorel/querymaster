export const ParseSql = (schema, axios,addSchema,setSchemaSpinner,message,userId,fileName) => {
    setSchemaSpinner(true);
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
            console.dir(error)
            setSchemaSpinner(false);
        });

}