export const convertToSQLite = (setRunSpinner, ia, axios, message, runSQL, selectedDatabase, schemaList,runResult,setRunResult) => {
    setRunSpinner(true);
    const schema = schemaList.length > 0 ?schemaList[selectedDatabase].create+" "+schemaList[selectedDatabase].insert :'';
    if (schema==='') {
        message.error('Please load data source.');
        setRunSpinner(false);
    }
    axios({
        url: 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=' + process.env.BARDAI,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + process.env.BARDAI,
        },
        data: {
            prompt: { text: ia + "convert this query to SQLite" },
        },
    })
        .then(({ data }) => {
            console.log(data);
            const query=data?.candidates[0].output;
            const formatRes1 = query.match(/```sql\n([\s\S]+)\n```/)
            const formatRes2 = query.match(/```\n([\s\S]+)\n```/)
            let response = formatRes1?formatRes1[1]:formatRes2?formatRes2[1]:query;
            runSQL(schema, axios, response, setRunSpinner, message,runResult,setRunResult);

        })
        .catch(function (error) {
            message.error("An error has occurred.");
            setRunSpinner(false);
        });
}