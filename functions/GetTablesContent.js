export const getTablesContent = (schema, axios, setCurrentTable, schemaList, selectedDatabase, selectedTable, message) => {
    const table = schemaList.filter((schema, i) => i === selectedDatabase).map((schema, i) => {
        return schema.tables.filter((table, i) => i === selectedTable)
    })
    console.log(schema, "SELECT * FROM " + table[0]);
    axios({
        url: 'https://querymasterapi-moreldev.onrender.com/query',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.RUNSQL,
        },
        data: {
            schema: schema,
            query: "SELECT * FROM " + table[0] + ";"
        },
    })
        .then(({ data }) => {
            let tables = data['table'];
            let columns = [];
            let values=[];
            
            if (tables.length > 0) {
                tables[0].columns.map(col => {
                    columns.push(
                        {
                            title: col,
                            dataIndex: col,
                            key: col,
                        },
                       
                    )
                     
                })
                tables[0].values.map((val,valPos)=>{
                    let valObj={}
                    val.map((feild,feildPos)=>{
                        columns.map((col,colPos)=>{
                            if (feildPos===colPos) {
                               valObj[`${col.key}`] =feild;
                            //    console.log(col,feild)
                            }
                        })
                        
                    })
                    valObj[`key`] =valPos;
                    console.log(valObj);
                    values.push(valObj)
                })
                setCurrentTable({columns:columns,values:values})
                // tables[0].map(table=>{
                //     console.log(table)
                // })
            }
            console.log(tables);

        })
        .catch(function (error) {
            message.error("An error has occurred.");
        });

}