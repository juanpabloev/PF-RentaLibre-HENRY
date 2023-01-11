import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  VStack,
  Text
} from '@chakra-ui/react';

export default function Register() {

  const router = useRouter();
  const { data: session } = useSession();

  return (

    <VStack alignItems={'center'} spacing={50} marginTop={40}>

      <Text fontSize="4xl" as='b' color={'red'}>
        {session?.user?.name},
      </Text>

      <Text fontSize="4xl" as='b' color={'red'}>
        SU USUARIO HA SIDO BLOQUEADO
      </Text>
      
    </VStack>
  )
}


