export const getTables = (schema, axios, request, setSchemaSpinner, message, userId, addSchema, fileName,) => {

    axios({
        url: 'http://localhost:3001/query',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.RUNSQL,
        },
        data: {
            schema: schema,
            query: request
        },
    })
        .then(({ data }) => {
            let tables = data['table'][0]['values'];
            let newTables = [];
            tables.map((table) => {
                if (table[0] !== 'sqlite_sequence') {
                    newTables.push(table[0])
                }
            }
            )
            console.log(newTables)
            addSchema(schema, userId, message,fileName,setSchemaSpinner,newTables)
        })
        .catch(function (error) {
            console.dir(error)
            message.error("An error has occurred.");
            setSchemaSpinner(false);
        });

}