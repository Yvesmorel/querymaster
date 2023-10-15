

const getSQL = async (axios, setSendSpinner, human, wordAllow, database, message, setIa, addQuery, selectedDatabase, schemaList) => {
    function isValidQuery(query) {
        let isValid = 0;

        wordAllow.forEach(allow => {
            let lower = query.toLowerCase();
            let index = lower.indexOf(allow);

            if (index !== -1) {
                isValid++;
            }
        });
        return isValid;
    }


    if (isValidQuery(human) > 0) {
        // Exécuter la requête
       
        const request = schemaList.length > 0 ? "Create SQL query to " + human + ' in' + database + "based on this SQL code" + schemaList[selectedDatabase].schema : "Create SQL query to " + human + ' in' + database
        console.log(request);
        axios({
            url: 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=' + process.env.BARDAI,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + process.env.BARDAI,
            },
            data: {
                prompt: { text: request },
            },
        })
            .then(({ data }) => {
                console.log('succes');
                let response = data?.candidates[0].output?.match(/```sql\n([\s\S]+)\n```/)[1];
                setIa(response || 'No result')
                addQuery(human, response, 'Simple', null, "ZEfggj7u6EOX61hIrkeZc2EEwl93", message);
                setSendSpinner(false);
            })
            .catch(function (error) {
                console.dir(error);
                message.error("An error has occurred, please try again.");
                setSendSpinner(false);
            });
    } else {
        message.error('Invalid query.');
        setSendSpinner(false);
    }
};
export { getSQL }