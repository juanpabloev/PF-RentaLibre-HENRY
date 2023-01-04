//import articulos from '../../productListScratchData/articulos.json';

//FALTA ACTIVAR CARD !!

//FALTA PASAR A TSX !!

import { trpc } from "../../utils/trpc";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";
// type Params = {
//   params: {
//     id: string;
//   };
// };

// export async function getStaticProps({ params: { id } }: Params) {
//   const res = trpc.product.getProductByID.useQuery({ id });
//   const data = res.data;
//   //console.log(data)
//   return {
//     props: { product: data },
//   };
// }

// ponemos id del primer producto,
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "1" } }],
//     fallback: true,
//   };
// }

/*     export default function ProductDetail({ product }) {
      return (
        <div>
        <h1>soy detail</h1> 
        <h2>{product.productName}</h2>
        </div>
      )
    } */

// type Props = {
//   product: RouterOutputs["product"]["getProductByID"];
// };

export default function ProductDetail() {
  const router = useRouter();
  const session = useSession();
  const { id }:any = router.query;
  //trae del back con id
  const product = trpc.product.getProductByID.useQuery({ id }).data;
  const addFavorite = trpc.user.addFavorite.useMutation();

  const colorTxt = useColorModeValue("black", "gray.900");
  const colorBg = useColorModeValue("yellow.300", "orange.50");

  async function handleSubmit() {
    try {
      const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer APP_USR-5672095275524228-121515-ef3e594e4fc515b3e4d7d98cff8d97e1-1263932815`
        },
        body: JSON.stringify({
            payer:
              {
                email: session?.data?.user?.email,
                phone: ""
              },
            items: [
              {
                title: product?.title,
                description: product?.description,
                picture_url: product?.pictures[0],
                category_id: product?.category,
                quantity: 1,//AGREGAR PRODUCT?.QUANTITY a schema
                unit_price: product?.price
              }
            ],
            back_urls: {
              success: 'http://localhost:3000/success',
              failure: 'http://localhost:3000/failure',
              pending: 'http://localhost:3000/pending'
            },
            notification_url: 'https://04c5-191-97-97-69.sa.ngrok.io/api/notificar'
          })
      });
      const json = await res.json();
      console.log(json, session?.data?.user?.email)
      router.push(json.init_point)
    } catch (error) {
      console.error(error);
    }
}

  const handleFavorites = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    addFavorite.mutate({ productId: id });

    alert(`${product?.title} agregado a favoritos`);
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
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
          {session.status === "authenticated" ? (
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={colorBg}
              color={colorTxt}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={(e) => handleFavorites(e)}
            >
              Añadir a favoritos
            </Button>
          ) : null}
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
              {/* <Text fontSize={'lg'}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                  maxime modi nam officiis porro, quae, quisquam quos
                  reprehenderit velit? Natus, totam.
                </Text> */}
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
                {/* <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List> */}
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
                  {product?.user?.userName}
                </ListItem>
                {/* <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Bracelet:
                    </Text>{' '}
                    leather strap
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Case:
                    </Text>{' '}
                    Steel
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Case diameter:
                    </Text>{' '}
                    42 mm
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Dial color:
                    </Text>{' '}
                    Black
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Crystal:
                    </Text>{' '}
                    Domed, scratch‑resistant sapphire crystal with anti‑reflective
                    treatment inside
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Water resistance:
                    </Text>{' '}
                    5 bar (50 metres / 167 feet){' '}
                  </ListItem> */}
              </List>
            </Box>
          </Stack>
          
          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
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
    </Container>
  );
}
