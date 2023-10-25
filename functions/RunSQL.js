export const runSQL = (schema, axios, ia, setRunSpinner, message, runResult, setRunResult) => {

    axios({
        url: 'https://querymasterapi-moreldev.onrender.com/query',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.RUNSQL,
        },
        data: {
            schema: schema,
            query: ia
        },
    })
        .then(({ data }) => {
            let tables = data['table'];
            let columns = [];
            let values = [];

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
                tables[0].values.map((val, valPos) => {
                    let valObj = {}
                    val.map((feild, feildPos) => {
                        columns.map((col, colPos) => {
                            if (feildPos === colPos) {
                                valObj[`${col.key}`] = feild;
                                //    console.log(col,feild)
                            }
                        })

                    })
                    valObj[`key`] = valPos;
                    console.log(valObj);
                    values.push(valObj)
                })
                setRunResult({ columns: columns, values: values })
                // tables[0].map(table=>{
                //     console.log(table)
                // })
            }
          
            setRunSpinner(false);
        })
        .catch(function (error) {
            console.log(schema);
            message.error("An error has occurred.");
            setRunSpinner(false);
        });

}