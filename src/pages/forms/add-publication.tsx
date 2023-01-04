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


//import sendEmail from "../utils/contact-functions/contact-Email";

const initValues = { name: "", email: "", category: "", description: "", title: "" };

const initState = { isLoading: false, error: "", values: initValues };


export default function Addpublication() {
    const toast = useToast();
    const { data: session, status } = useSession({ required: true });

    const categories = trpc.category.getCategories.useQuery().data;
    //console.log(categories) // array - [id, name]

    const [state, setState] = useState(initState);

    interface Touched {
        name: boolean,
        email: boolean,
        category: boolean,
        description: boolean,
        title: boolean,
    }
    const [touched, setTouched] = useState<Touched>({
        name: false,
        email: false,
        category: false,
        description: false,
        title: false,
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
                name: false,
                email: false,
                category: false,
                description: false,
                title: false,
                
            });
            setState(initState);
            toast({
                title: "Message sent.",
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
            <Heading marginBottom={30}>Publicar Artículo</Heading>
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
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={touched.category && !values.category} mb={5}>
                <FormLabel>Categoría</FormLabel>
                <Select 
                    variant='filled'
                    placeholder='Elegir'
                    name="category"
                    errorBorderColor="red.300"
                    value={values.category}
                    onChange={handleSelect}
                    onBlur={onBlur}>
                    {categories?.sort().map((c) => (
                        <option value={c.name}>{c.name}</option>
                    ))}

                </Select>
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

            <Button
                variant="outline"
                colorScheme="blue"
                isLoading={isLoading}
                disabled={
                    !values.title || !values.description
                }
                onClick={onSubmit}
            >
                Publicar
            </Button>
        </Container>
    );

}