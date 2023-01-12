import { trpc } from "../../utils/trpc";
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
  Textarea,
  useToast,
} from "@chakra-ui/react";

import DateRangeComp from "../../components/calendar-range-picker/DateRangeComp";

import { MdLocalShipping } from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Style from "../../styles/id.module.css";
import Carusel from "../../components/Carusel";

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
  const toast = useToast();
  const router = useRouter();
  const session = useSession();
  const { id }: any = router.query;
  //trae del back con id
  const product = trpc.product.getProductByID.useQuery({ id }).data;
  const ratings = trpc.rating.getRatingsProduct.useQuery({
    productId: id,
    page: 1,
  }).data;
  const utils = trpc.useContext();
  const addComment = trpc.rating.createRatingProduct.useMutation({
    onSuccess() {
      utils.rating.getRatingsProduct.invalidate();
    },
  });
  const updateComment = trpc.rating.updateRating.useMutation({
    onSuccess() {
      utils.rating.getRatingsProduct.invalidate();
    },
  });
  const deleteComment = trpc.rating.deleteRating.useMutation({
    onSuccess() {
      utils.rating.getRatingsProduct.invalidate();
    },
  });
  const addFavorite = trpc.user.addFavorite.useMutation();
  const addTypeNotification =
    trpc.notification.createNotification.useMutation();
  const [ratingInput, setRatingInput] = useState({
    rating: "3",
    comment: "",
  });
  const [err, setErr] = useState({
    stars: false,
    size: true,
  });
  const [edit, setEdit] = useState(false);
  const [adminPostId, setadminPostId] = useState("");

  const connected = session.status === "authenticated";
  let alredyCommented = false;
  const userComment = ratings?.find(
    (rating) => rating.userRater.id === session.data?.user?.id
  );
  if (userComment) alredyCommented = true;
  useEffect(() => {}, [alredyCommented]);

  const authorized = session.data?.userDB?.role === "ADMIN";

  const colorTxt = useColorModeValue("black", "gray.900");
  const colorBg = useColorModeValue("yellow.300", "orange.50");

  const handleFavorites = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    addFavorite.mutate({ productId: id });

    toast({
      title: "Agregado a favoritos.",
      status: "success",
      duration: 2000,
      position: "top",
    });
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
        message:
          `Tu producto ha recibido un review: "` + ratingInput.comment + `"`,
        productId: id,
        id: product?.userId!,
        productName: product?.title!,
        productImage: product?.pictures[0]!,
      });
    }
  };

  let avarage: any = 0;
  if (product?.rating && product?.rating.length > 0) {
    let sum = 0;
    product?.rating?.forEach((rating: any) => (sum += rating.stars));
    avarage = (sum / product?.rating.length).toFixed(1);
  }

  const handleDelete = (e: any) => {
    if (userComment) deleteComment.mutate({ ratingId: userComment.id });
    if (authorized) deleteComment.mutate({ ratingId: e.target.value });
    setRatingInput({
      ...ratingInput,
      rating: "3",
      comment: "",
    });

    setErr({
      ...err,
      stars: false,
      size: false,
    });
  };

  const handleConfirmEdit = (e: any) => {
    if (authorized) {
      updateComment.mutate({
        comment: ratingInput.comment,
        stars: parseInt(ratingInput.rating),
        ratingId: e.target.value,
      });
      setEdit(false);
    } else {
      if (!userComment) return;
      if (!userComment.comment) return;
      updateComment.mutate({
        comment: ratingInput.comment,
        stars: parseInt(ratingInput.rating),
        ratingId: userComment.id,
      });

      setEdit(false);
    }
  };
  const handleEdit = (e: any) => {
    if (authorized) {
      const values = e.target.value.split(",");
      setadminPostId(values[0]);
      setRatingInput({
        rating: values[1],
        comment: values[2],
      });
      setEdit(true);
    } else {
      if (!userComment) return;
      if (!userComment.comment) return;
      setRatingInput({
        rating: userComment.stars.toString(),
        comment: userComment.comment,
      });
      setEdit(true);
    }
  };
  const dataCarusel = product?.pictures.map((image, index) => {
    return {
      id: index,
      picture: image,
    };
  });


  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Carusel dataCarusel={dataCarusel}/>
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
              rounded={10}
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
                <ListItem>{product?.user?.name}</ListItem>
              </List>
            </Box>
          </Stack>
          <Box>
            <div className="datePicker">
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"2"}
              >
                Consultar Fechas
              </Text>
              <DateRangeComp
                productName={product?.title}
                productUserName={product?.user?.name}
                productUserEmail={product?.user?.email}
                productPrice={product?.price}
                productId={product?.id}
              />
            </div>
          </Box>
          <HStack spacing={75} justifyContent={"center"}></HStack>
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
            {edit ? null : (
              <>
                {!userComment && !authorized ? (
                  <>
                    <Text>{rating.userRater.name}</Text>
                    <Text>{rating.stars} stars</Text>
                    <Text>{rating.comment}</Text>
                  </>
                ) : (
                  <>
                    <Text>{rating.userRater.name}</Text>
                    <Text>{rating.stars} stars</Text>
                    <Text>{rating.comment}</Text>
                    <Button
                      colorScheme={"blue"}
                      onClick={(e) => handleEdit(e)}
                      value={[
                        rating.id,
                        rating.stars.toString(),
                        rating.comment,
                      ]}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme={"red"}
                      onClick={(e) => handleDelete(e)}
                      value={rating.id}
                    >
                      X
                    </Button>
                    <br />
                  </>
                )}
              </>
            )}

            <br />
          </Box>
        );
      })}
      <hr />
      {(connected && (!alredyCommented || edit)) || (authorized && edit) ? (
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
                    checked={1 === parseInt(ratingInput.rating)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={2}
                    onChange={(e) => handleRatingChange(e)}
                    checked={2 === parseInt(ratingInput.rating)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={3}
                    onChange={(e) => handleRatingChange(e)}
                    checked={3 === parseInt(ratingInput.rating)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={4}
                    onChange={(e) => handleRatingChange(e)}
                    checked={4 === parseInt(ratingInput.rating)}
                  />
                  <i></i>
                  <input
                    type="radio"
                    name="rating"
                    value={5}
                    onChange={(e) => handleRatingChange(e)}
                    checked={5 === parseInt(ratingInput.rating)}
                  />
                  <i></i>
                </span>
              </fieldset>
              <Textarea
                name="comment"
                value={ratingInput.comment}
                onChange={(e: any) => handleRatingChange(e)}
              />
              {userComment || authorized ? (
                <Button
                  colorScheme={"blue"}
                  onClick={(e) => handleConfirmEdit(e)}
                >
                  {" "}
                  Confirmar
                </Button>
              ) : (
                <Button colorScheme={"red"} type="submit">
                  Commentar
                </Button>
              )}
            </form>
          </Stack>
        </Box>
      ) : null}
    </Container>
  );
}