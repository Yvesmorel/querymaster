export const convertToSQLite=(setRunSpinner,ia,axios,message,runSQL)=>{
    setRunSpinner(true);
    const schema=`-- create
    CREATE TABLE EMPLOYEE (
      empId INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      dept TEXT NOT NULL
    );
    
    -- insert
    INSERT INTO EMPLOYEE VALUES (0001, 'Clark', 'Sales');
    INSERT INTO EMPLOYEE VALUES (0002, 'Dave', 'Accounting');
    INSERT INTO EMPLOYEE VALUES (0003, 'Ava', 'Sales');
    `
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
            let response=data?.candidates[0].output;
            runSQL(schema,axios,response,setRunSpinner,message)
          
        })
        .catch(function (error) {
            message.error("An error has occurred.");
            setRunSpinner(false);
        });
}