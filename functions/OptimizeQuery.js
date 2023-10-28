

import { separateSQLAndJSON } from "./SqlSeparate";

const parseToJson=(json)=> {
    try {
        const jsonObject = JSON.parse(json);
        console.log(jsonObject);
      } catch (error) {
        console.error('Erreur de parsing JSON :', error);
      }
}


const OptimizeQuery = async (selectedDatabase,schemaList,axios,ia, database, message, setIa,wordAllow,setOptimizedSpinner) => {
    setOptimizedSpinner(true);
    if (ia==='') {
        setOptimizedSpinner(false);
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


    if (isValidQuery(ia) > 0) {
        // Exécuter la requête
       
        const request = schemaList.length > 0 ? "Optimizes this SQL query For" + database  + "based on this SQL code" + schemaList[selectedDatabase].create+": "+ia : "Optimizes this SQL query For" + database+": "+ia
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
                const formatRes1=data?.candidates[0].output?.match(/```sql\n([\s\S]+)\n```/)
                const formatRes2=data?.candidates[0].output?.match(/```\n([\s\S]+)\n```/)
                let response = formatRes1?formatRes1[1]:formatRes2?formatRes2[1]:data?.candidates[0].output;
                setIa(response || 'No result');
                message.info('Successfully optimized query.')
                setOptimizedSpinner(false);
            })
            .catch(function (error) {
                message.error("An error has occurred please try again.");
                setOptimizedSpinner(false);
            });
    } else {
        message.error('Invalid query.');
        setOptimizedSpinner(false);
    }
};
export { OptimizeQuery }