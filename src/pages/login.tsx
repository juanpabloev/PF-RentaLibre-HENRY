import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

import { Button, ButtonGroup, Center, Text, Box, Flex } from '@chakra-ui/react'


const login = () => {
  const { data: session } = useSession();
  //console.log(session); //me va a dar  objeto con la info de la sesion

  if (session) {
    return (
      <Center marginTop={40}>
        <Flex direction={'column'}>
        <Box marginBottom={5}>
        <Text fontSize='lg' as='b'>{session?.user?.name}, estas logueado</Text>
        </Box>
        <Button
          colorScheme='teal'
          size='md'
          onClick={() => signOut()}>
          Cerrar Sesión
        </Button>
        </Flex>
      </Center>
    )

  } else {
    return (
      <Center marginTop={40}>
        <Button
          colorScheme='teal'
          size='md'
          onClick={() => signIn()}>
          Iniciar Sesión
        </Button>
      </Center>
    );
  }
};

export default login;
