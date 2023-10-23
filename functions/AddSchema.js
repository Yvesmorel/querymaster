import { collection, doc, addDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useContext } from "react";
import { useState, useEffect } from "react";
export const addSchema = async (create,insert, userId, message, fileName, setSchemaSpinner,tables,tableList) => {
    const date = new Date()
    try {
        await addDoc(collection(db, "schema"), {
            create: create,
            insert:insert,
            date: date.toLocaleDateString(),
            fileName: fileName,
            userId:userId,
            columns:tables.columns,
            data:tables.data,
            tableList:tableList
        })
        message.info('Schema Saved Successfully!')
        setSchemaSpinner(false);
    } catch (error) {
        console.dir(error)
        message.error('Error when saving the schema, please try again.')
        setSchemaSpinner(false);
    }
}