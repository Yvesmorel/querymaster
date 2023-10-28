import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

function insererSautLigne(chaine) {
    const mots = chaine.split(' ');
    let resultat = '';

    for (let i = 0; i < mots.length; i++) {
        resultat += mots[i] + ' ';
        if ((i + 1) % 4 === 0) {
            resultat += '\n';
        }
    }

    return resultat.trim(); // Retire l'espace en fin de chaîne
}

const getQuery = async (axios, setSendSpinner, human, wordAllow, database, message, setIa, addQuery, getSQL, selectedDatabase, schemaList,setTyping) => {
    setSendSpinner(true);
    setTyping();
    setIa('');
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
            const formatRes1 = query.match(/```sql\n([\s\S]+)\n```/)
            const formatRes2 = query.match(/```\n([\s\S]+)\n```/)
            const res=formatRes1?formatRes1[1]:formatRes2?formatRes2[1]:query;
            setIa(res || 'No result.');
            setSendSpinner(false);
        } else {
            getSQL(axios, setSendSpinner, human, wordAllow, database, message, setIa, addQuery, selectedDatabase, schemaList,setTyping)
        }
    } catch (error) {

        setSendSpinner(false);
    }

};
export { getQuery };