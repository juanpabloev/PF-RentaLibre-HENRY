import React, { useState } from "react";
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";

interface Props {
    user: any
    state: any
}

const PopUpComponent = ({user,state}:Props) => {
    return (
    <Box  position="absolute" w="100%" h="100%">
      <Flex bgColor='blackAlpha.900' w='50%' ml='30%' borderRadius='40px' justifyContent='space-evenly' > 
        <Text color='white' fontSize='25px' ml='2%' display='inline-block'>
        usuario 
        <Text color='blue.200' fontSize='25px' ml='1%' mr='1%' display='inline-block'>
         {`${user.name} ${user.lastName ? user.lastName : ''}`}
        </Text>
        <Text color='white' fontSize='25px' ml='1%' mr='1%' display='inline-block'>
         {`ha sido ${state.bannedUser ? 'bloqueado' : 'desbloqueado'}`}
        </Text>
        </Text>
      </Flex>
    </Box>
  );
};

export default PopUpComponent;