import { useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

import { v4 } from "uuid"; //crea random UUID- se le suma al nombre del archivo

//*********************************** */
//****NO LOGRO MODULARIZARLA!!! ******
//******************************* */


//En el componente://////////////////////////////////

// const [upload, setUpload] = useState<any>(null);

// --> setUpload en onchange // se lo pasamos a handleSubmit

/* EJ DE COMPONENTE

return (
  <div className="App">
    <input
      type="file"
      onChange={(event) => {
        setUpload(event.target.files[0]);
      }}
    />
    <button onClick={uploadFile}> Upload Image</button>
    {imageUrls.map((url: any) => {
      return <img src={url} />;
    })}
  </div>
); */


// Recibe archivo, URL de firebase --> retorna url archivo en firebase

const handleSubmitFirebase = (uploadToURL: string, fileUpload: any)  => {
  const [url, setUrl] = useState<any>(null);
  let fileURL: string = "";

  const fileRef = ref(storage, `${uploadToURL}/${fileUpload.name + v4()}`);

  uploadBytes(fileRef, fileUpload)
    .then(() => {
      getDownloadURL(fileRef)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          console.log(error.message, "error getting the file url");
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
    console.log(fileURL)
  return url;
};

export default handleSubmitFirebase;

/* /---------------------------/
 EJ DE COMPONENTE

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url: any) => {
        return <img src={url} />;
      })}
    </div>
  ); */
