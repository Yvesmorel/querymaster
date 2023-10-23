export const runSQL = (schema, axios, ia, setRunSpinner, message, runResult, setRunResult) => {

    axios({
        url: 'http://localhost:3001/query',
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
            console.log(tables);
            setRunSpinner(false);
        })
        .catch(function (error) {
            message.error("An error has occurred.");
            setRunSpinner(false);
        });

}