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
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Style from "../../styles/id.module.css";


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
  const router = useRouter();
  const session = useSession();
  const { id }: any = router.query;
  //trae del back con id
  const product = trpc.product.getProductByID.useQuery({ id }).data;
  const ratings = trpc.rating.getRatingsProduct.useQuery({
    productId: id,
    page: 1,
  }).data;
  const addComment = trpc.rating.createRatingProduct.useMutation();
  const addFavorite = trpc.user.addFavorite.useMutation();
  const addTypeNotification = trpc.notification.createNotification.useMutation();
  const [ratingInput, setRatingInput] = useState({
    rating: "0",
    comment: "",
  });
  const [err, setErr] = useState({
    stars: true,
    size: true,
  });
  const colorTxt = useColorModeValue("black", "gray.900");
  const colorBg = useColorModeValue("yellow.300", "orange.50");

  const connected = session.status === "authenticated";

  async function handleSubmit() {
    try {
      const res = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer APP_USR-5672095275524228-121515-ef3e594e4fc515b3e4d7d98cff8d97e1-1263932815`,
          },
          body: JSON.stringify({
            payer: {
              email: session?.data?.user?.email,
              phone: "",
              name: session?.data?.user?.name,
            },
            product_id: id,
            items: [
              {
                title: product?.title,
                description: product?.description,
                picture_url: product?.pictures[0],
                category_id: product?.category,
                id: product?.id,
                quantity: 1, //AGREGAR PRODUCT?.QUANTITY a schema
                unit_price: product?.price,
              },
            ],
            back_urls: {
              success: `http://localhost:3000/success/${id}`,
              failure: `http://localhost:3000/failure/${id}`,
              pending: `http://localhost:3000/pending/${id}`,
            },
            notification_url:
              `https://rentalibre.vercel.app/success/${id}`,
          }),
        }
      );
      console.log(id)
      const json = await res.json();
      router.push(json.init_point);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFavorites = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    addFavorite.mutate({ productId: id });
    alert(`${product?.title} agregado a favoritos`);
  };
  const handleRatingChange = (e: any) => {
    e.preventDefault();
    const name = e.target.name;
    setRatingInput({
      ...ratingInput,
      [name]: e.target.value,
    });

    setErr(validate(ratingInput));
  };
  const handleRatingSubmit = (e: any) => {
    e.preventDefault();

    if (!err.size && !err.stars) {
      addComment.mutate({
        productId: id,
        comment: ratingInput.comment,
        stars: parseInt(ratingInput.rating),
      });
      addTypeNotification.mutate({
        type: "Review",
        message: `Tu producto ha recibido un review: "`+ratingInput.comment+`"`,
        productId: id,
        id: product?.userId!,
        productName: product?.title!,
        productImage: product?.pictures[0]!,
      });
    }
  };

  let avarage = 0;
  if (product?.rating && product?.rating.length > 0) {
    let sum = 0;
    product?.rating?.forEach((rating) => (sum += rating.stars));
    avarage = sum / product?.rating.length;
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
          <Text
            color={useColorModeValue("gray.900", "gray.400")}
            fontWeight={300}
            fontSize={"2xl"}
          >
            {avarage + "/5  estrellas"}
          </Text>
          {connected ? (
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
                  {product?.user?.name}
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
      <hr></hr>
      {ratings?.map((rating) => {
        return (
          <Box key={rating.id}>
            <br />
            <Text>{rating.userRater.name}</Text>
            <Text>{rating.stars} stars</Text>
            <Text>{rating.comment}</Text>
            <br />
          </Box>
        );
      })}
      <hr />
      {connected ? (
        <Box>
          <Stack spacing={{ base: 6, sm: 9 }} direction={"column"} margin="5">
            <form onSubmit={(e) => handleRatingSubmit(e)}>
              <fieldset>
                <span className={Style.starRating}>
                  <input
                    type="radio"
                    name="rating"
                    value={1}
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={2}
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={3}
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={4}
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={5}
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <i></i>
                </span>
              </fieldset>
              <Textarea
                name="comment"
                value={ratingInput.comment}
                onChange={(e) => handleRatingChange(e)}
              />
              <Button colorScheme={"red"} type="submit">
                Commentar
              </Button>
            </form>
          </Stack>
        </Box>
      ) : null}
    </Container>
  );
}
