
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
export const getSchema = (userId, setSchemaList) => {
    const q = query(collection(db, "schema"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const schemaList = [];
        querySnapshot.forEach((doc) => {
            schemaList.push(doc.data());
            console.log(doc.data())
        });
        setSchemaList(schemaList)
    });
    return unsubscribe;
}