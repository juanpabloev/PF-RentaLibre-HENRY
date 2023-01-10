import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

import {
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    FormHelperText,
    Heading,
    Input,
    Text,
    Textarea,
    useToast,

} from "@chakra-ui/react";


//import sendEmail from "../utils/contact-functions/contact-Email";

const initValues = { name: "", email: "", subject: "", message: "", transactionNumber: "" };

const initState = { isLoading: false, error: "", values: initValues };


export default function Claim() {
    const toast = useToast();
    const { data: session, status } = useSession({ required: true });

    const [state, setState] = useState(initState);

    interface Touched {
        name: boolean,
        email: boolean,
        subject: boolean,
        message: boolean,
        transactionNumber: boolean,
    }
    const [touched, setTouched] = useState<Touched>({
        name: false,
        email: false,
        subject: false,
        message: false,
        transactionNumber: false,
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
                subject: false,
                message: false,
                transactionNumber: false,
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
            <Heading marginBottom={30}>Formulario de Reclamo</Heading>
            {error && (
                <Text color="red.300" my={4} fontSize="xl">
                    {error}
                </Text>
            )}

            <FormLabel marginBottom={5}>Nombre: {session?.userDB.name}</FormLabel>

            <FormControl isRequired isInvalid={touched.transactionNumber && !values.transactionNumber} mb={5}>
                <FormLabel>Transacción Número</FormLabel>
                <Input
                    type="text"
                    name="transactionNumber"
                    errorBorderColor="red.300"
                    value={values.transactionNumber}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                <FormErrorMessage>Obligatorio</FormErrorMessage>
            </FormControl>

            <FormControl
                isRequired isInvalid={touched.message && !values.message} mb={5}
            >
                <FormLabel>Reclamo</FormLabel>
                <Textarea
                    name="message"
                    rows={4}
                    errorBorderColor="red.300"
                    value={values.message}
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
                    !values.transactionNumber || !values.message
                }
                onClick={onSubmit}
            >
                Enviar
            </Button>
        </Container>
    );
}