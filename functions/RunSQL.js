export const runSQL=(schema,axios,ia,setRunSpinner,message)=>{
    
        axios({
            url: 'https://querymasterapi-moreldev.onrender.com/query',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: 'Bearer ' + process.env.RUNSQL,
            },
            data: {
                schema: schema,
                query:ia
            },
        })
            .then(data => {
                console.log(data);
                setRunSpinner(false);
            })
            .catch(function (error) {
                message.error("An error has occurred.");
                setRunSpinner(false);
        });
    
}