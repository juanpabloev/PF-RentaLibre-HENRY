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
  Text,
  useColorModeValue,
  Box,
  CloseButton,
} from "@chakra-ui/react";
//import Rating from '@mui/material/Rating';

//import handleDelete from '../pages/favorites';

/* const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
   */
export default function CardProductList({
  id,
  photo,
  productName,
  productPrice,
  rating,
}) {
  return (
    <Center py={6}>
      {" "}
      {/* {`/productDetail/$id}`} */}
      <Stack
        //borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "700px" }}
        height={{ sm: "476px", md: "10rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        padding={4}
      >
        {/* <CloseButton
          size="sm"
          background="gray.100"
          value={id}
          onClick={(e) => handleDelete(e)}
        /> */}
        <Flex flex={0.4} /* bg="blue.400" */ align="center">
          <Box w="170px" /* bg="red.500" */>
            <Image
              objectFit="contain"
              boxSize="180px"
              src={photo}
              maxW={{ base: "100%", sm: "200px" }}
              height="160px"
            />
          </Box>
        </Flex>
        <Link href={`/productDetail/${id}`}>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            p={1}
            pt={2}
            pl={10}
          >
            <Heading fontSize={"xl"} fontFamily={"body"}>
              {productName}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {"Valoraciones: " + rating + " *"}
            </Text>
            <Text fontWeight={600} fontSize={"xl"}>
              {"$ " + productPrice}
            </Text>
          </Stack>
        </Link>
      </Stack>
    </Center>
  );
}
