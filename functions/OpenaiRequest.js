

const getSQL = async (axios, getQuery, setSendSpinner, human, wordAllow, database, message, setIa, alreadyGenerate, setAlreadyGenerate) => {
    await getQuery(human, setSendSpinner, message, setIa,alreadyGenerate, setAlreadyGenerate);
   
    if (alreadyGenerate==false) {
        console.log("return")
        return;
    }
  

    if (!human) {

        message.info("Please enter your query.");
        setSendSpinner(false);
        return;
    }

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

        axios({
            url: 'https://api.openai.com/v1/completions',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + process.env.OPENAIKEY,
            },
            data: {
                model: 'text-davinci-003',
                prompt: 'Create a SQL request' + human + ' in' + database + ' :',
                temperature: 0.3,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            },
        })
            .then(res => {
                let query = res.data.choices[0].text
                setIa(query)
                setSendSpinner(false);
            })
            .catch(function (error) {
                message.error("An error has occurred.");
                setSendSpinner(false);
            });
    } else {
        message.error('Invalid query.');
        setSendSpinner(false);
    }
};
export { getSQL }