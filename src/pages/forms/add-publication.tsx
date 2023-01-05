import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { RouterOutputs, trpc } from "../../utils/trpc";
import ErrorPage from 'next/error';

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
}

const initValues: InitValues = {
    title: "",
    category: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    securityDeposit: "",
};

const initState = { isLoading: false, error: "", values: initValues };


export default function Addpublication() {
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
    }
    const [touched, setTouched] = useState<Touched>({
        title: false,
        category: false,
        description: false,
        price: false,
        brand: false,
        model: false,
        securityDeposit: false,
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
                {values.securityDeposit < (values.price*8) && values.securityDeposit > 0 && (<Text color="red.500" fontSize="sm" marginTop={2}>El precio debe ser mayor a ${values.price*8}</Text>)}
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