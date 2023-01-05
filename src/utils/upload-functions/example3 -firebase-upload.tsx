import "./App.css";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid"; //crea random UUID- se le suma al nombre del archivo

function App() {
  const [fileUpload, setFileUpload] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      setFileUpload(e.target.files[0]);
    }
  };
  const handleSubmitFirebase = () => {
    const fileRef = ref(storage, `url/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        getDownloadURL(fileRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the file url");
          });
        setFileUpload(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      <Avatar src={url} sx={{ width: 150, height: 150 }} />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmitFirebase}>Submit</button>
    </div>
  );
}

export default App;