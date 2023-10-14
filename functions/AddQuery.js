import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useContext } from "react";
import { useState,useEffect } from "react";

export const addQuery = async (query, res, type, table,currentUser) => {
    const date = new Date()
    try {
      await setDoc(doc(db, type, currentUser.uid), {
        query: query,
        result: res,
        date: date.toLocaleDateString(),
        table: table
      });
    } catch (error) {
      console.dir(error)

    }
  }