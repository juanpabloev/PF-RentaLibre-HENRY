// otro - https://www.youtube.com/watch?v=U3RKqgXzCcY
// https://codesandbox.io/s/multiple-firebase-file-uploads-zftmwv?file=/src/firebase.ts:606-1171


// IMPORTAR: import { uploadFile } from "./firebase-functions";

import { UploadTaskSnapshot } from "firebase/storage";

/* import React, { useState } from "react";
import { uploadFile } from "./firebase-functions";
import "./styles.css";

type UploadObjectType = {
  preview: string;
  progress?: number;
};

type StatusObjectType = {
  [key: string]: UploadObjectType;
};

export default function App() {
  const [link, setLink] = useState<string | null>(null); //para resultado
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusObject, setStatusObject] = useState<StatusObjectType>({});

  //Genera preview de la imagen en memoria
  const getPreview = (file: File): Promise<string | ArrayBuffer | null> => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    return new Promise((res, rej) => {
      fileReader.onload = () => {
        res(fileReader.result);
      };
    });
  };

  const onUpdateUpload = async (
    snapshot: UploadTaskSnapshot,
    filename: string
  ) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setStatusObject((ob) => ({
      ...ob,
      [filename]: { ...ob[filename], progress }
    }));
  };

  // part 2 - <Esta recibe muchos archivos
  const handleMultiple = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || !evt.target.files.length) return;
    const files = Array.from(evt.target.files);
    const objects: StatusObjectType = {};
    for (let file of files) {
      const preview = (await getPreview(file)) as string;
      objects[file.name] = { preview };
    }
    setStatusObject(objects);
    const promises = files.map((file) => {
      return uploadFile(file, (snapshot) =>
        onUpdateUpload(snapshot, file.name)
      );
    });
    const ls = await Promise.all(promises);
    setLinks(ls);
  };

  // part 1 - para un solo
  const handleFile = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;
    if (!files || !files.length) return;
    setLoading(true);
    const url = await uploadFile(files[0]);
    setLink(url);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Upload files</h1>
      <h2>Start with one:</h2>
      <input accept="image/*" multiple onChange={handleMultiple} type="file" />
      <h3>Links:</h3>
      <ul>
        {links.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {Object.values(statusObject).map((ob) => {
          return (
            <div>
              <img
                width="180"
                src={ob.preview}
                key={ob.preview}
                alt="preview"
              />
              <p>{ob.progress}%</p>
            </div>
          );
        })}
      </div>
      {loading && (
        <img
          alt="spinner"
          width="200"
          src="https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif"
        />
      )}
    </div>
  );
}
 */