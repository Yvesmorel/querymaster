import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";


const getQuery = async (data, setSendSpinner, message, setIa, alreadyGenerate, setAlreadyGenerate) => {
    setSendSpinner(true);
    try {
        const q = query(collection(db, 'Simple'), where("query", "==", data));
        const recupData = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            recupData.push(doc.data());
        });

        if (recupData.length > 0) {
            let i = 0;
            let query = recupData[0]?.result
            setIa(query)
            setAlreadyGenerate(!alreadyGenerate);
            setSendSpinner(false);
        } else {
            setAlreadyGenerate(!alreadyGenerate);
        }



    } catch (error) {

        setSendSpinner(false);
    }

};
export { getQuery };