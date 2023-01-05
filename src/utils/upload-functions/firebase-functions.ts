import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

import { v4 } from 'uuid';

function imageUpload() {
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<any>([]);

  const imagesListRef = ref(storage, "publicationPicture/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `publicationPicture/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev: any) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev: any) => [...prev, url]);
        });
      });
    });
  }, []);

  return imageUrls;
  //retorna array con url de imagenes
}


export default imageUpload;

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
