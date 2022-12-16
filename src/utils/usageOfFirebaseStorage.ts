import {Input,Img,Box,Text,Button} from "@chakra-ui/react";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { Progress } from '@chakra-ui/react'

  const [url,setUrl] = useState('')
  const [file,setFile] = useState<File>()
  const [progresUpload,setProgresUpload] = useState(0)

  function handleSelectFile (file: any) {
    file ? setFile(file[0]) : ''
  }

  function handleUpload (file: any){
    const name = file.name 
    const storageRef = ref(storage,`userPicture/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgresUpload(progress)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
        });
      }
    );
    }
  // esto es para que lo prueben ustes en sus respectivos componentes


  
    // <>
    //   <Input type='file' onChange={(files)=>handleSelectFile(files.target.files)}/>
    //   {file && !url && (<>
    //   <Box>
    //     <Text ml='20px'>{file.name}</Text>
    //     <Text ml='20px'>size: {`${file.size} bytes`}</Text>
    //     <Button mt='10px' ml='200px' onClick={()=>handleUpload(file)}>Upload</Button>
    //     <Progress value={progresUpload} />
    //   </Box>
    //   </>)}
    //   {url && 
    //  (<><Img src={url} alt={url} w='100px' h='100px'/> <Text>{url}</Text></>)
    //   } 
    // </>
