import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Image,
  Divider,
  CloseButton,
  Stack,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineCloseCircle, AiFillCloseSquare, AiOutlineCloseSquare } from "react-icons/ai";
import CardProductFavorites from '../components/CardProductFavorites';
import styles from "../styles/productList.module.css";

function Favorites() {
  const { data: session, status } = useSession();
  const favorites = trpc.user.getFavorites.useQuery({
    userId: session?.user?.id,
  });
  console.log(favorites.data);
  const [lenght, setLenght] = useState(favorites?.data?.length);
  const utils = trpc.useContext();

  const removeFavorite = trpc.user.deleteFavorite.useMutation();

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    removeFavorite.mutate({ favoriteId: e.target.id });
    if (lenght) setLenght(lenght - 1);
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "authenticated") {
    utils.user.getFavorites.invalidate({ userId: session.user?.id });
    if (favorites.isLoading) return <div>Loading...</div>;
    if (favorites.data?.length === 0) return <div>No hay Favoritos</div>;

    return (

      <div className={styles.cardsDivProdHome}>
        <List>
          {favorites?.data?.map((favorite, index) => (

            <ListItem key={index}>
              <Center py={6}>
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
                  <button value={favorite.id} onClick={(e) => handleDelete(e)}>
                    <ListIcon
                      as={AiOutlineCloseSquare}
                      color="grey.100"
                      h="30"
                      w="30"
                      id={favorite.id}
                    />
                  </button>
                  <CardProductFavorites
                    productName={favorite.product?.title}
                    photo={favorite.product?.pictures[0]}
                    productPrice={favorite.product?.price}
                    rating='TRAER DE BASE DE DATOS!!!'
                    id={favorite.product?.id}
                    key={index}
                  />
                </Stack>
              </Center>
            </ListItem>
          ))}
        </List>
      </div>
    );
  } else {
    return <div>Tenes que estar conectado para acceder a favoritos</div>;
  }
}

export default Favorites;
