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
            prompt: { text: schema + "convert this sql query to SQLite Query" },
        },
    })
        .then(({ data }) => {
            console.log(data?.candidates[0].output.match(/(CREATE TABLE .*?;|INSERT INTO .*?;)/gs).join(''));
            let response = data?.candidates[0].output.match(/(CREATE TABLE .*?;|INSERT INTO .*?;)/gs).join('');
            getTables(response, axios, "SELECT name FROM sqlite_master WHERE type='table';", setSchemaSpinner, message, userId, addSchema, fileName)
        })
        .catch(function (error) {
            getTables(schema, axios, "SELECT name FROM sqlite_master WHERE type='table';", setSchemaSpinner, message, userId, addSchema, fileName)
            console.dir(error)
            message.error("An error has occurred, please try again.");
            setSchemaSpinner(false);
        });
}