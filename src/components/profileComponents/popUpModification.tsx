import { ScaleFade, useDisclosure } from "@chakra-ui/react";
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  toggle: boolean;
}

const PopUpModification = ({ toggle }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  useEffect(() => {
    if (toggle) {
      onToggle();
    }
  }, [toggle]);
  return (
    <Box w="100%" h="100%" position="fixed">
      <ScaleFade initialScale={0.9} in={isOpen} >
        <Box
        textAlign='center'
          p="30px"
          color="white"
          mt='3%'
          bg="teal.500"
          shadow="md"
          borderRadius='50px'
        >
          <Text color="white" fontSize="25px" ml="2%" display="inline-block">
            Perfil modificado exitosamente ✅
          </Text>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default PopUpModification;
