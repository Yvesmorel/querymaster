import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useContext } from "react";
import { useState,useEffect } from "react";

export const addQuery = async (query, res, type, table,userId,message) => {
    const date = new Date()
    try {
      await setDoc(doc(db, type, userId), {
        query: query,
        result: res,
        date: date.toLocaleDateString(),
        table: table
      });
      message.info('Query Saved Successfully!')
    } catch (error) {
      message.error('Error when saving the request, please try again.')
    }
  }