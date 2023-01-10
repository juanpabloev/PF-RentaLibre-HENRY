import { trpc } from "../../../utils/trpc";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Badge,
  Textarea,
  useToast,
  Input,
} from "@chakra-ui/react";

import { MdLocalShipping } from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Style from "../../../styles/id.module.css";


const validate = (input: any) => {
  const errors = {
    stars: false,
    size: false,
  };
  if (input.rating > 5 || input.rating < 1) {
    errors.stars = true;
  }
  if (input.comment.length < 5 || input.comment.length > 300) {
    errors.size = true;
  }
  return errors;
};

export default function ProductDetail() {

  // console.log('Window Location:', window.location)

  const myKeysValues = window.location.search;
  const urlParams = new URLSearchParams(myKeysValues);

  //const id = urlParams.get('prodId');
  const totalDays = urlParams.get('totalDays');
  const totalPrice = urlParams.get('totalPrice');
  const startDate = urlParams.get('startDate');
  const endDate = urlParams.get('endDate');
  const userID = urlParams.get('U');

  //console.log(totalDays, totalPrice)

  const toast = useToast();
  const router = useRouter();
  const session = useSession();
  const { id }: any = router.query;
  //trae del back con id
  const product = trpc.product.getProductByID.useQuery({ id }).data;

  const authorized = session.data?.userDB?.role === "ADMIN";

  const colorTxt = useColorModeValue("black", "gray.900");
  const colorBg = useColorModeValue("yellow.300", "orange.50");

  async function handleSubmit() {
    try {
      const res = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.NEXT_PUBLIC_MERCADOLIBRE_AUTHORIZATION}`,
          },
          body: JSON.stringify({
            payer: {
              email: session?.data?.user?.email,
              phone: "",
            },
            items: [
              {
                title: product?.title,
                description: product?.description,
                picture_url: product?.pictures[0],
                category_id: product?.category,
                quantity: 1, //AGREGAR PRODUCT?.QUANTITY a schema
                unit_price: product?.price,
              },
            ],
            back_urls: {
              success: "http://localhost:3000/success",
              failure: "http://localhost:3000/failure",
              pending: "http://localhost:3000/pending",
            },
            notification_url:
              "https://04c5-191-97-97-69.sa.ngrok.io/api/notificar",
          }),
        }
      );
      const json = await res.json();
      console.log(json, session?.data?.user?.email);
      router.push(json.init_point);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={10}
            alt={"product image"}
            src={product?.pictures[0]}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product?.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {"$ " + product?.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {product?.description}
              </Text>

            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Categoría
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>{product?.category.name}</ListItem>
                  {/*  <ListItem>Master Chronometer Certified</ListItem>{' '}
                    <ListItem>Tachymeter</ListItem> */}
                </List>

              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Usuario
              </Text>

              <List spacing={2}>
                <ListItem>
                  {/* <Text as={'span'} fontWeight={'bold'}>
                      Between lugs:
                    </Text>{' '} */}
                  {product?.user?.name}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <HStack spacing={75} justifyContent={"center"}></HStack>
          <Button
            rounded={10}
            w={250}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("teal", "gray.50")}
            color={useColorModeValue("white", "teal")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={handleSubmit}
          >
            {product?.availability ? (
              <Badge ml={2} colorScheme="green">
                Disponible para renta!
              </Badge>
            ) : (
              <Badge ml={2} colorScheme="red">
                No disponible
              </Badge>
            )}
          </Button>



          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>Consultar Envío</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <hr></hr>


      <hr />




    </Container>
  );
}
