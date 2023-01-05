import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { RouterOutputs, trpc } from "../../utils/trpc";

import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid"; //crea random UUID- se le suma al nombre del archivo

import {
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
    Textarea,
    useToast,
    Center,
    Select,
    Box,
    Img,
    Progress,

} from "@chakra-ui/react";
import { string } from "zod";


//import sendEmail from "../utils/contact-functions/contact-Email";

interface InitValues {
    title: string;
    category: string;
    description: string;
    price: any; // es any por que de lo contrario, en init state, me aparece un 0 en el campo.
    brand: string;
    model: string;
    securityDeposit: any;
    pictures: any;
}

const initValues: InitValues = {
    title: "",
    category: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    securityDeposit: "",
    pictures: [],
};

const initState = { isLoading: false, error: "", values: initValues };


export default function AddPublication() {
    const toast = useToast();
    const { data: session, status } = useSession({ required: true });

    const categories = trpc.category.getCategories.useQuery().data;
    //console.log(categories) // array - [id, name]

    const [state, setState] = useState(initState);

    interface Touched {
        title: boolean,
        category: boolean,
        description: boolean,
        price: boolean,
        brand: boolean,
        model: boolean,
        securityDeposit: boolean,
        pictures: boolean,
    }
    const [touched, setTouched] = useState<Touched>({
        title: false,
        category: false,
        description: false,
        price: false,
        brand: false,
        model: false,
        securityDeposit: false,
        pictures: false,
    });


    const { values, isLoading, error } = state;

    const onBlur = (e: any) =>
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));

    const handleChange = (e: any) =>
        setState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [e.target.name]: e.target.value,
            },
        }));

    const handleSelect = (e: any) =>
        setState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [e.target.name]: e.target.value,
            },
        }));



    /*  const handleClickPictures = (e: any) => {
 
         const uploadedimageURL = handleSubmitFirebase("publicationPicture/", upload)
 
         setState((prev) => ({
             ...prev,
             values: {
                 ...prev.values,
                 [e.target.name]: [...values.pictures, uploadedimageURL]
             },
         }));
 
         console.log(values.pictures)
     } */
    //********IMAGE UPLOADS*********************************** */
    const [url, setUrl] = useState<any>("");
    const [file, setFile] = useState<any>();
    const [progresUpload, setProgresUpload] = useState(0);

    function handleSelectFile(file: any) {
        file ? setFile(file[0]) : "";
    }

    function handleUpload(file: any) {
        const name = file.name;
        const storageRef = ref(storage, `publicationPicture/${'RL-Publication-Picture-' +v4() + name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            .then((snapshot:any) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgresUpload(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error:any) => {
                // Handle unsuccessful uploads
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setState((prev) => ({
                            ...prev,
                            values: {
                                ...prev.values,
                                [values.pictures]: [...values.pictures, url]
                            },
                        }));
                    })
            }
        ));
    }



    const onSubmit = async () => {
        setState((prev) => ({
            ...prev,
            isLoading: true,
        }));
        try {
            console.log(values);
            //sendEmail(values);

            //77777777777777777777777777777777777

            //ACA AGREGAR LO QUE ADONDE QUERRAMOS ENVIAR LA INFO !!!!!!

            ////////////////////////////////////////////////////

            setTouched({
                title: false,
                category: false,
                description: false,
                price: false,
                brand: false,
                model: false,
                securityDeposit: false,
                pictures: false,
            });
            setState(initState);
            toast({
                title: "¡Artículo Publicado!",
                status: "success",
                duration: 2000,
                position: "top",
            });
        } catch (error: any) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: error?.message,
            }));
        }
    };

    return (
        <Container maxW="450px" mt={12}>
            <Heading marginBottom={30} textAlign='center'>Publicar Artículo</Heading>
            {error && (
                <Text color="red.300" my={4} fontSize="xl">
                    {error}
                </Text>
            )}

            <FormLabel marginBottom={5}>Nombre: {session?.userDB.name}</FormLabel>
            <FormLabel marginBottom={5}>E-mail: {session?.userDB.email}</FormLabel>
            <FormLabel marginBottom={5}>Teléfono: CHEQUEAR TELEFONO EN DB  !!!!</FormLabel>
            <FormLabel marginBottom={5}>¿Datos Correctos?</FormLabel>
            <Center marginBottom={10}>
                <Button
                    colorScheme='teal'
                    size='md'
                    /* onClick={() => signOut()} */>
                    Editar Perfil
                </Button>
            </Center>

            <FormControl isRequired isInvalid={touched.category && !values.category} mb={5}>
                <FormLabel>Categoría</FormLabel>
                <Select
                    variant='filled'
                    placeholder='Elegir'
                    name="category"
                    errorBorderColor="red.300"
                    value={values.category}
                    onChange={handleSelect}
                    onBlur={onBlur}
                >
                    {categories?.sort().map((c) => (
                        <option value={c.name}>{c.name}</option>
                    ))}
                </Select>
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={touched.title && !values.title} mb={5}>
                <FormLabel>Título</FormLabel>
                <Input
                    type="text"
                    name="title"
                    errorBorderColor="red.300"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                {values.title.length > 60 && (<Text color="red.500" fontSize="sm" marginTop={2}>Max 60 caracteres - {values.title.length} / 60</Text>)}
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            {/* <FormControl isRequired isInvalid={touched.pictures && !values.pictures} mb={5}>
                <FormLabel>Fotos</FormLabel>
                <Input
                    type="file"
                    name="pictures"
                    accept="image/x-png,image/gif,image/jpeg"
                    errorBorderColor="red.300"
                    value={values.pictures}
                    onChange={handleImageChange}
                    onClick={handleUploadPictures}
                    onBlur={onBlur}
                />
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl> */}


            <FormControl isRequired isInvalid={touched.pictures && !values.pictures} mb={5}>
            <FormLabel>Fotos</FormLabel>
                <Input
                variant='unstyled'
                type='file'
                name="pictures"
                accept="image/x-png,image/gif,image/jpeg"
                errorBorderColor="red.300"
                onBlur={onBlur}
                value={values.pictures}
                onChange={(files) => handleSelectFile(files.target.files)} />
                

                {file && !url && (<>
                    <Box>
                        <Text ml='20px'>{file.name}</Text>
                        <Text ml='20px'>size: {`${file.size} bytes`}</Text>
                        <Button 
                        mt='10px' ml='200px' 
                        colorScheme='teal' size='md'
                        onClick={() => handleUpload(file)}
                        >Subir Fotos
                        </Button>
                        <Progress value={progresUpload} marginTop={3}/>
                    </Box>
                </>)}

                {url &&
                    (<><Img src={url} alt={url} w='100px' h='100px' /> <Text>{url}</Text></>)
                }
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>



            <Box>
                {values.pictures.map((u: any) => {
                    return <img src={u} />;
                })}
            </Box>

            <FormControl isRequired isInvalid={touched.brand && !values.brand} mb={5}>
                <FormLabel>Marca</FormLabel>
                <Input
                    type="text"
                    name="brand"
                    errorBorderColor="red.300"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                {values.brand.length > 30 && (<Text color="red.500" fontSize="sm" marginTop={2}>Max 30 caracteres - {values.brand.length} / 30</Text>)}
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={touched.model && !values.model} mb={5}>
                <FormLabel>Modelo</FormLabel>
                <Input
                    type="text"
                    name="model"
                    errorBorderColor="red.300"
                    value={values.model}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                {values.model.length > 30 && (<Text color="red.500" fontSize="sm" marginTop={2}>Max 30 caracteres - {values.model.length} / 30</Text>)}
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={touched.price && !values.price} mb={5}>
                <FormLabel>Precio</FormLabel>
                <Input
                    type="number"
                    name="price"
                    errorBorderColor="red.300"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                {values.price < 80 && values.price > 0 && (<Text color="red.500" fontSize="sm" marginTop={2}>El precio debe ser mayor a $80</Text>)}
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={touched.securityDeposit && !values.securityDeposit} mb={5}>
                <FormLabel>Seña</FormLabel>
                <Input
                    type="number"
                    name="securityDeposit"
                    errorBorderColor="red.300"
                    value={values.securityDeposit}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                {values.securityDeposit < (values.price * 8) && values.securityDeposit > 0 && (<Text color="red.500" fontSize="sm" marginTop={2}>El precio debe ser mayor a ${values.price * 8}</Text>)}
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <FormControl
                isRequired isInvalid={touched.description && !values.description} mb={5}
            >
                <FormLabel>Descripción</FormLabel>
                <Textarea
                    name="description"
                    rows={6}
                    errorBorderColor="red.300"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <Center>
                <Button
                    variant="outline"
                    colorScheme="blue"
                    isLoading={isLoading}
                    disabled={
                        !values.title || values.title.length > 60 || !values.brand || values.brand.length > 30 || !values.model || values.model.length > 30 || !values.description || !values.category || !values.price || values.price < 80 || !values.securityDeposit || values.securityDeposit < 3500
                    }
                    onClick={onSubmit}
                >
                    Publicar
                </Button>
            </Center>
        </Container>
    );

}