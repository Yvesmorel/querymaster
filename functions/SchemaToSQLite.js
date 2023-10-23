export const schemaToSQLite = (schema, axios, message, userId, addSchema, fileName, setSchemaSpinner, getTables) => {
    setSchemaSpinner(true)
    axios({
        url: 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=' + process.env.BARDAI,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + process.env.BARDAI,
        },
        data: {
            prompt: { text:'Give me the list of tables and fields of each table in json based on this sql code :'+schema },
            safetySettings: [ 
                { 
                   
                } 
            ], 
            stopSequences: [ 
                
            ], 
            temperature: 1.0, 
            candidate_count: 1, 
            maxOutputTokens: 2048, 
        },
    })
        .then(({ data }) => {
            console.log(data?.candidates[0].output);
            // let response = data?.candidates[0].output.match(/(CREATE TABLE .*?;|INSERT INTO .*?;)/gs).join('');
            // getTables(response, axios, "SELECT name FROM sqlite_master WHERE type='table';", setSchemaSpinner, message, userId, addSchema, fileName)
            setSchemaSpinner(false);
        })
        .catch(function (error) {
         
            console.dir(error)
            message.error("An error has occurred, please try again.");
            setSchemaSpinner(false);
        });
}