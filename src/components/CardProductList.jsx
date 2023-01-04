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
} from "@chakra-ui/react";
//import Rating from '@mui/material/Rating';

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
      <Link href={`/productDetail/${id}`}>
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
          <Flex flex={0.4} /* bg="blue.400" */ align="center">
            <Box w="170px" /* bg="red.500" */>
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
              {"Valoraciones: " + rating + " *"}
            </Text>
            <Text fontWeight={600} fontSize={"xl"}>
              {"$ " + productPrice}
            </Text>
            {/* <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
              Actress, musician, songwriter and artist. PM for work inquires or
              <Link href={'#'} color={'blue.400'}>
                #tag
              </Link>
              me in your posts
            </Text> */}
            {/* <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}>
                #art
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}>
                #photography
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('gray.50', 'gray.800')}
                fontWeight={'400'}>
                #music
              </Badge>
            </Stack> */}

            {/*  <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}>

              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}>
                Message
              </Button>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow
              </Button>
            </Stack> */}
          </Stack>
        </Stack>
      </Link>
    </Center>
  );
}
