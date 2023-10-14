import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";


const getQuery = async (axios, setSendSpinner, human, wordAllow, database, message, setIa, addQuery, getSQL) => {
    setSendSpinner(true);
    if (!human) {
        message.info("Please enter your query.");
        setSendSpinner(false);
        return;
    }
    try {
        const q = query(collection(db, 'Simple'), where("query", "==", human));
        const recupData = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            recupData.push(doc.data());
        });

        if (recupData.length > 0) {
            let query = recupData[0]?.result
            setIa(query)
            setSendSpinner(false);
        } else {
            getSQL(axios, setSendSpinner, human, wordAllow, database, message, setIa, addQuery)
        }
    } catch (error) {

        setSendSpinner(false);
    }

};
export { getQuery };