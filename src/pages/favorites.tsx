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
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
function Favorites() {
  const session = useSession();
  const favorites = trpc.user.getFavorites.useQuery({
    userId: session.data?.user?.id,
  });
  console.log(favorites.data);
  const [lenght, setLenght] = useState(favorites?.data?.length);
  const utils = trpc.useContext();

  const removeFavorite = trpc.user.deleteFavorite.useMutation();

  const handleDelete = (e: any) => {
    e.preventDefault();

    removeFavorite.mutate({ favoriteId: e.target.id });
    if (lenght) setLenght(lenght - 1);
  };

  if (session.status === "loading") return <div>Loading...</div>;

  if (session.status === "authenticated") {
    utils.user.getFavorites.invalidate({ userId: session.data?.user?.id });
    if (favorites.isLoading) return <div>Loading...</div>;
    if (favorites.data?.length === 0) return <div>No hay Favoritos</div>;

    return (
      <Box display="flex">
        <List
          spacing={5}
          bg="gray.800"
          w="100%"
          h="auto"
          display="flex"
          flexDirection="column"
          color="white"
        >
          {favorites?.data?.map((favorite, index) => {
            return (
              <ListItem key={index}>
                <Divider orientation="horizontal" variant="solid" />
                <button value={favorite.id} onClick={(e) => handleDelete(e)}>
                  <ListIcon
                    as={AiOutlineCloseCircle}
                    color="red.500"
                    h="30"
                    w="30"
                    id={favorite.id}
                  />
                </button>
                <Link href={`productDetail/${favorite.product?.id}`}>
                  <Image
                    src={favorite.product?.pictures[0]}
                    alt={favorite.product?.title}
                    h="40"
                  />
                  <p>{favorite.product?.title}</p>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  } else {
    return <div>Tenes que estar conectado para acceder a favoritos</div>;
  }
}

export default Favorites;
