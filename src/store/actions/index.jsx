import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';

export const loading = createAction('LOADING');

export const createDocRef = createAsyncThunk('createDocRef', async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
});
