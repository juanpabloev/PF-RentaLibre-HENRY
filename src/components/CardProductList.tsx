import Link from "next/link";
import {
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

export default function CardProductList({
  id,
  photo,
  productName,
  productPrice,
  rating,
}:any) {
  let avarage = 0.0 || "";
  if (rating && rating.length > 0) {
    let sum = 0;
    rating?.forEach((rating:any) => (sum += rating.stars));
    avarage = (sum / rating.length).toFixed(1);
  } else {
    avarage = '0.0';
  }
  return (
    <Center py={6}>
      <Link href={`/productDetail/${id}`}>
        <Stack
          borderRadius="lg"
          w={{ sm: "100%", md: "700px" }}
          height={{ sm: "476px", md: "10rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"xl"}
          padding={4}
        >
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
              {"Valoraciones: " + avarage + "/5.0  estrellas" + " *"}
            </Text>
            <Text fontWeight={600} fontSize={"xl"}>
              {"$ " + productPrice}
            </Text>
          </Stack>
        </Stack>
      </Link>
    </Center>
  );
}
