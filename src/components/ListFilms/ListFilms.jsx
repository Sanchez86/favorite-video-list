import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/firebase';

import { doc, getFirestore, getDoc } from "firebase/firestore"; 

const ListFilms = () => {
  const {auth} = firebase;

  const [user] = useAuthState(auth());
  
  const db = getFirestore();

  const docRef = doc(db, "users", user.uid);
  const docSnap = getDoc(docRef);
  
  docSnap.then((res) => {
    if (res.exists()) {
      //console.log("Document data:", res.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  })

  return (
    <div>
        <h2>ListFilms</h2>

        
    </div>
  );
}

export default ListFilms;
