export const schemaToSQLite=(schema,axios,message,userId,addSchema,fileName,setSchemaSpinner)=>{
    setSchemaSpinner(true)
    axios({
        url: 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=' + process.env.BARDAI,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + process.env.BARDAI,
        },
        data: {
            prompt: { text: schema + "convert this query to SQLite" },
        },
    })
        .then(({ data }) => {
            console.log(data?.candidates[0].output);
            let response=data?.candidates[0].output;
            addSchema(response, userId, message,fileName,setSchemaSpinner)
        })
        .catch(function (error) {
            console.dir(error)
            message.error("An error has occurred, please try again.");
            setSchemaSpinner(false);
        });
}