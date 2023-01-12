//import React from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Box,
  Switch,
} from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
//import Rating from '@mui/material/Rating';
import React, { useState} from "react";

export default function CardProductMyProduct({
  id,
  photo,
  productName,
  productPrice,
  rating,
  disabled,
  deleted,
}) {
  let avarage = 0;
  if (rating && rating.length > 0) {
    let sum = 0;
    rating?.forEach((rating) => (sum += rating.stars));
    avarage = sum / rating.length;
  }
  const [state, setState] = useState({
    disabled: disabled,
    deleted: deleted
  });
  const disableProduct = trpc.product.disableProduct.useMutation()
  const deleteProduct = trpc.product.deleteProduct.useMutation()
      function handleDisableProduct () {
        disableProduct.mutateAsync({productId:id,disabled: state.disabled ? false : true})
        .then((data) => setState((prevState)=>{return {disabled:data.disabled}})
          )
       }
       function handleDeleteProduct () {
        deleteProduct.mutateAsync({productId:id,deleted: state.deleted ? false : true})
        .then((data) => setState((prevState)=>{return {...prevState,deleted:data.deleted}}))
       }
  return (
    <Center py={6}>
      
        {" "}
        {/* {`/productDetail/$id}`} */}
        
        <Stack
          //borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "900px" }}
          height={{ sm: "476px", md: "10rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"xl"}
          padding={4}>

          <Link href={`/productDetail/${id}`}>
          <Flex flex={0.4} /* bg="blue.400" */ align="center">
            <Box w="170px"/* bg="red.500" */>
              <Image
                marginTop={-4}
                objectFit="contain"
                boxSize="180px"
                src={photo}
                maxW={{ base: "100%", sm: "200px" }}
                height="160px"
                alt={productName}/>
            </Box>
          </Flex>
          </Link>

          <Link href={`/productDetail/${id}`}>
          <Stack
            w={{ sm: "100%", md: "500px" }}
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            p={1}
            pt={2}
            pl={10}>
            <Heading fontSize={"xl"} fontFamily={"body"}>
              {productName}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {"Valoraciones: " + avarage + "/5  estrellas" + " *"}
            </Text>
            <Text fontWeight={600} fontSize={"xl"}>
              {"$ " + productPrice}
            </Text>
          </Stack>
          </Link>

          <VStack
          justifyContent='center'
          spacing='15px'
          >
            <Switch fontSize='sm' onChange={handleDisableProduct} isChecked={!state.disabled}>
              Activar / Desactivar
            </Switch>

            <a href={`/account/edit-publication/${id}`}>
            <Button size='sm' bgColor='blue.400' _hover={{bgColor:'blue.500'}}>
              Editar Publicación
            </Button>
            </a>

            <Button size='sm' onClick={handleDeleteProduct}
            _hover={{bgColor: state.deleted ? 'green.500' : "red.500"}}
            bgColor={ state.deleted ? 'green.400' : "red.400"}
            >
             {state.deleted ? 'Restablecer Publicación' : 'Borrar Publicación'}
            </Button>
    

          </VStack>
        </Stack>
      
    </Center>
  );
}
