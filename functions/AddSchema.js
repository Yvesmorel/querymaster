import { collection, doc, addDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useContext } from "react";
import { useState, useEffect } from "react";
export const addSchema = async (schema, userId, message, fileName, setSchemaSpinner,tables) => {
    const date = new Date()
    try {
        await addDoc(collection(db, "schema"), {
            schema: schema,
            date: date.toLocaleDateString(),
            fileName: fileName,
            userId:userId,
            tables:tables
        })
        message.info('Schema Saved Successfully!')
        setSchemaSpinner(false);
    } catch (error) {
        console.dir(error)
        message.error('Error when saving the schema, please try again.')
        setSchemaSpinner(false);
    }
}