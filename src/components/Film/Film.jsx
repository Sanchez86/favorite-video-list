import React from 'react';
import { Button, TextField } from '@mui/material';
import { doc, setDoc, getFirestore   } from "firebase/firestore"; 

const Film = () => {
  console.log('Films');

  const [image, setImage] = useState(null);
  const db = getFirestore();
  
  const sendData = async () => {

    await setDoc(doc(db, "films", "NY"), {
      name: "deadpool 2",
      genre: "comedy",
      country: "USA",
      id: 100,
      filmData: {
        name: 'batman',
        year: 1999
      }
    })

  }

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }
  
  return (

    <div>
      <TextField
          fullWidth
          variant={"outlined"}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input type="file" onChange={handleChange} />
        <Button onClick={sendData}>Send</Button>
    </div>

  );
}

export default Film;
