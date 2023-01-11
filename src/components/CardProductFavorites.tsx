import React from "react";
import Link from "next/link";
import {
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";

export default function CardProductList({
  id,
  photo,
  productName,
  productPrice,
}:any) {
  
  return (
    <Center py={6}>
      <Flex flex={0.4} align="center">
        <Box w="170px">
          <Image
            objectFit="contain"
            boxSize="180px"
            src={photo}
            maxW={{ base: "100%", sm: "200px" }}
            height="160px"
            alt={productName}
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
          <Text fontWeight={600} fontSize={"xl"}>
            {"$ " + productPrice}
          </Text>
        </Stack>
      </Link>
    </Center>
  );
}
