import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/firebase';

import { collection, doc, getFirestore, getDoc, query, where  } from "firebase/firestore"; 

const ListFilms = () => {
  console.log('ListFilms');

  const {auth} = firebase;
  const storage = firebase.storage();

  const [user] = useAuthState(auth());
  const [value, setValue] = useState('');
  

  const db = getFirestore();

  const docRef = doc(db, "cities", "LA");
  const q = query(collection(db, "cities"), where("id", "==", "100"));

  console.log('q', q)

  const docSnap = getDoc(docRef);
  
  docSnap.then((res) => {
    if (res.exists()) {
      console.log("Document data:", res.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  })

  return (
    <div>
        <h2>ListFilms</h2>
        <div>
        
          
        </div>
        
    </div>
  );
}

export default ListFilms;
