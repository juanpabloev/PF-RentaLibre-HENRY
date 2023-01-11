import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { RouterOutputs, trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

import { storage } from "../../../firebaseConfig";
import { UploadTaskSnapshot } from "firebase/storage";

import styles from "../../styles/productList.module.css"

import { v4 } from "uuid"; // -crea random UUID- se le suma al nombre del archivo //

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
    Image,
    Stack,
    Link,
    VStack,
    Progress,

} from "@chakra-ui/react";

import { uploadFile } from "../../utils/upload-functions/firebase-functions";

import sendEmail from "../../utils/contact-functions/contact-Email";

interface InitValues {
    userId?: string;
    title: string;
    category?: any; //recibe un onbjete {name, id}
    categoryId?: string;
    description: string;
    price: any; // es any por que de lo contrario, en init state, me aparece un 0 en el campo.
    brand: string;
    model: string;
    securityDeposit: any;
    pictures: any; //si pongo string[] falla
    availability: { available: boolean; dateAvailable: string[] }

}

const initValues: InitValues = {
    userId: "",
    title: "",
    category: "",
    categoryId: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    securityDeposit: "",
    pictures: [],
    availability: { available: false, dateAvailable: [''] }
};

const initState = { isLoading: false, error: "", values: initValues };

export default function AddPublication() {
    const toast = useToast();
    const { data: session, status } = useSession({ required: true });
    const router = useRouter()

    const categoriesDB = trpc.category.getCategories.useQuery().data;
    //console.log(categoriesDB) // array con objetos: : id, name

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


    ///*********************************** */
    //********IMAGE UPLOADS*********************************** */

    type UploadObjectType = {
        preview: string;
        progress?: number;
    };

    type StatusObjectType = {
        [key: string]: UploadObjectType;
    };

    ///ESTADOS IMAGENES--------------
    const [links, setLinks] = useState<string[]>([]);//para resultado
    const [loading, setLoading] = useState<boolean>(false);
    const [statusObject, setStatusObject] = useState<StatusObjectType>({}); //guarda el preview de las imagenes

    const handleResetPictures = () => {
        setLinks([]);
        setLoading(false);
        setStatusObject({});
        setState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [values.pictures]: values.pictures.pop()
            },
        }))
    }

    ///------------------------------------

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

    //callBack que recibe las actualizaciones de las imagenes
    const onUpdateUpload = async (
        snapshot: UploadTaskSnapshot,
        filename: string
    ) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // -> (en %)
        setStatusObject((ob: any) => ({
            ...ob,
            [filename]: { ...ob[filename], progress }
        }));
        //console.log(statusObject)
    };



    // part 2 - <Esta FCN recibe muchos archivos
    const handleMultiple = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (!evt.target.files || !evt.target.files.length) return;
        //setLoading(true);

        const files = Array.from(evt.target.files);
        const objects: StatusObjectType = {};
        for (let file of files) {
            const preview = (await getPreview(file)) as string;
            objects[file.name] = { preview };
            //console.log(preview)
        }
        setStatusObject(objects);
        const promises = files.map((file) => {
            return uploadFile('publicationPicture/', file, 'RL-Publication-Picture-', (snapshot) =>
                onUpdateUpload(snapshot, file.name)
            );
        });
        const ls = await Promise.all(promises); //ls - links
        //setLinks(ls);
        //setLoading(false);

        /* setLinks(prev => ({
            ...prev,
            links: links.push?.apply(links, ls)
        })) */

        setState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [values.pictures]: values.pictures.push(...ls)
            },

        }))

        /*  ls.map((l) => (
             setState((prev) => ({
                 ...prev,
                     [values.pictures]: values.pictures.push(l)
 
             }))
         )) */
        //console.log(values.pictures)

        /* ls.map((l) => (
            setState((prev) => ({
                ...prev,
                values: {
                    ...prev.values,
                    [values.pictures]: [values.pictures.push(l)]
                },
            }))
        ))
        console.log(values?.pictures) */
    }

    const productPublication = trpc.product.createProducts.useMutation()

    const onSubmit = async (e: any) => {

        let publicationResponse: any = 0;

        e.preventDefault()

        const sendValues = {
            //UserId: session?.userDB.id,
            title: state.values.title,
            categoryId: state.values.category,
            description: state.values.description,
            price: parseInt(state.values.price),
            brand: state.values.brand,
            model: state.values.model,
            securityDeposit: parseInt(state.values.securityDeposit),
            pictures: state.values.pictures,
            availability: { available: false, dateAvailable: [] }

        }

        setState((prev) => ({
            ...prev,
            isLoading: true,
        }));
        try {
            //console.log(sendValues);

            await productPublication.mutateAsync(
                sendValues
            ).then((data: any) => {
                publicationResponse = data;
            })

            //envio notificaciond e email - si publicacon ok:

            const values = {
                name: session?.userDB?.name,
                email: session?.userDB?.email,
                subject: 'Su publicación ha sido exitosa',
                message: 'Estimado ' + session?.userDB.name + '. Su artículo ' + sendValues.title + ' ha sido publicado correctamente. Usted puede administrar sus publicaciones desde https://rentalibre.vercel.app/account/my-publications. Saudos, El equipo de rentalibre.'
            };

            //console.log(values);

            if (true) {
                sendEmail(values);
            } else {
                console.log('No Data response from publication');
            };

            //********************************** */

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
            setStatusObject({});
            toast({
                title: "¡Artículo Publicado!",
                status: "success",
                duration: 2000,
                position: "top",
            });

            router.push("/");

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
            {session?.userDB.phoneNumber &&
                <FormLabel marginBottom={5}>Teléfono: {session?.userDB.phoneNumber}</FormLabel>
            }
            {!session?.userDB.phoneNumber &&
                <Text color="red.500" fontSize="md" marginBottom={5}
                >Debe proporcionar teléfono, edite perfil para continuar</Text>
            }
            <FormLabel marginBottom={5}>¿Datos Correctos?</FormLabel>
            <Center marginBottom={10}>
                <a href={"/account/profile"}>
                    <Button colorScheme='teal' size='md'>
                        Editar Perfil
                    </Button>
                </a>
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
                    {categoriesDB?.sort().map((c: any) => (
                        <option value={c.id} key={c.id}>{c.name}</option>
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

            <FormControl isRequired isInvalid={touched.pictures && !values.pictures} mb={5}>

                {values?.pictures.length < 100 && (
                    <FormLabel marginBottom={3} fontWeight='semibold'>Seleccione entre 1 y 4 fotos</FormLabel>)}

                {values?.pictures.length !== 0 && (
                    <Text marginBottom={3} fontWeight='semibold'>Cantidad Fotos: {values.pictures.length}</Text>)}

                {values?.pictures.length > 4 && (
                    <Text marginBottom={3} fontWeight='semibold' color="red.300">
                        ¡NO PUEDE SELECCIONAR MAS DE 4 FOTOS!</Text>)}

                <input
                    accept="image/*"
                    multiple
                    onChange={handleMultiple}
                    type="file"
                    className={styles.customFinput}
                />
                <Center>
                    <Stack direction='row' marginTop={7}>
                        {Object.values(statusObject).map((ob: any) => {
                            return (
                                <Box key={v4()}>
                                    <Image
                                        boxSize='150px'
                                        borderRadius={8}
                                        objectFit='cover'
                                        src={ob.preview}
                                        key={v4()}
                                        alt="preview"
                                    />
                                    <p>{ob.progress}%</p>
                                </Box>
                            );
                        })}
                    </Stack>
                </Center>

                <Center>
                    <Button
                        marginBottom={4}
                        marginTop={7}
                        colorScheme='teal'
                        size='md'
                        onClick={(handleResetPictures)}>
                        Eliminar Fotos
                    </Button>
                </Center>

                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <div className="Spinner">
                {/*            <h2>Start with one:</h2>
                <input accept="image/*" multiple onChange={handleMultiple} type="file" />
                <h3>Links:</h3>
                <ul>
                    {values.pictures.map((li: any) => (
                        <li key={li}>{li}</li>
                    ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {Object.values(statusObject).map((ob) => {
                        return (
                            <Box key={v4()}>
                                <Image
                                    width="180"
                                    src={ob.preview}
                                    key={v4()}
                                    alt="preview"
                                />
                                <p>{ob.progress}%</p>
                            </Box>
                        );
                    })}
                </div> */}
                {loading && (
                    <Image
                        alt="spinner"
                        width="200"
                        src="https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif"
                    />
                )}
            </div>

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
                        !values.title || values.title.length > 60 || !values.brand || values.brand.length > 30 || !values.model || values.model.length > 30 || !values.description || !values.category || !values.price || values.price < 80 || !values.securityDeposit || values.securityDeposit < 3500 || !values.pictures || values.pictures.length > 4 || values.pictures.length === 0 || !session?.userDB.phoneNumber
                    }
                    onClick={onSubmit}
                    marginBottom={10}
                >
                    Publicar
                </Button>
            </Center>
        </Container>
    );

}