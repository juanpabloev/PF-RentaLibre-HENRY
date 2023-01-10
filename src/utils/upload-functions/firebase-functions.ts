import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
} from "firebase/storage";

import { storage } from "../../../firebaseConfig";

import { v4 } from "uuid"; //crea random UUID- se le suma al nombre del archivo


/// EJ: usageOfFirebaseStorage-3.tsx /// - misma carpeta

// methods

//se ejecuta on change

// Recibe parametros obligatorios:
/* 
- URL para upload
- archivo a subir
- prefijo del archivo (string)

OPCIONALES: UPDATE CALL BACK

--> retorna url archivo en firebase

 */

export const uploadFile = (
  uploadToURL: string,
  file: File,
  filePrefix: string,
  updateCb: (snapshot: UploadTaskSnapshot) => void = () => false
): Promise<string> => {
  const path = `${uploadToURL}/${filePrefix + v4() + file.name}`; // direccion donde se guarda - inc filename
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((res, rej) => {
    return uploadTask.on( //metodo de firebase que da actualizacion de la subida --> AQUI SE RESUELVE O RECHAZA LA PROMESA
      "state_changed", //esto observa on
      updateCb, // cb de actualizacion
      () => rej(null), //si regect - nada por ahora - pero aqui se pasaria la accion
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => { //obtenemos URL subida
          res(downloadURL); // retornamo el URL resuelto
        });
      }
    );
  });
};
