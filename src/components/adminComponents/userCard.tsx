import React, { useState } from "react";
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";

interface Props {
  user: any;
}

const UserCard = ({ user }: Props) => {
  const [state, setState] = useState({
    viewProducts: false,
    viewUser: false,
  });

  return (
    <Box>
      <Flex ml="2%">
        <Img src={user.image} w="25px" h="20px" mt="2px" />
        <Text ml="1%" fontSize="20px" fontWeight="semibold">{`${user.name} ${
          user.lastName ? user.lastName : ""
        }`}</Text>
        <Button
          fontSize="19px"
          w="10%"
          h="25px"
          ml="1%"
          bgColor={state.viewUser ? "red.400" : "blue.400"}
          color="black"
          _hover={{ bg: "#404c5a", color: "white" }}
          onClick={() =>
            setState({ ...state, viewUser: state.viewUser ? false : true })
          }
        >
          {state.viewUser ? "dejar de ver" : "ver usuario"}
        </Button>
      </Flex>
      {state.viewUser && (
        <Box m="0 2% 2% 2%" border="solid 2px blue" borderRadius="30px">
          <Flex ml="2%">
            <Text fontSize="20px" fontWeight="semibold">
              Nombre completo:
            </Text>
            <Text
              ml="1%"
              fontSize="20px"
              fontWeight="semibold"
              color="blue.400"
            >{`${user.name} ${user.lastName ? user.lastName : ""}`}</Text>
            <Button
              fontSize="19px"
              h="25px"
              mt="2px"
              ml="2%"
              bgColor="red.400"
              color="black"
              _hover={{ bg: "#404c5a", color: "white" }}
            >
              Bloquear
            </Button>
          </Flex>
          <Flex ml="2%">
            <Text fontSize="20px" fontWeight="semibold">
              Número de teléfono:
            </Text>
            <Text
              ml="1%"
              fontSize="20px"
              fontWeight="semibold"
              color="blue.400"
            >{`${user.phoneNumber ? user.phoneNumber : "Sin Número"}`}</Text>
          </Flex>
          <Flex ml="2%">
            <Text fontSize="20px" fontWeight="semibold">
              Locación:
            </Text>
            <Text
              ml="1%"
              fontSize="20px"
              fontWeight="semibold"
              color="blue.400"
            >
              {user.location?.country ? user.location.country : "Argentina"}-{" "}
              {user.location?.state ? user.location.state : "Sin Provincia"} -{" "}
              {user.location?.city ? user.location.city : "Sin Localidad"}
            </Text>
          </Flex>
          <Flex ml="2%">
            <Text fontSize="20px" fontWeight="semibold">
              Email:
            </Text>
            <Text
              ml="1%"
              fontSize="20px"
              fontWeight="semibold"
              color="blue.400"
            >
              {user.email}
            </Text>
          </Flex>
          <Flex ml="2%">
            <Text fontSize="20px" fontWeight="semibold">
              Código postal:
            </Text>
            <Text
              ml="1%"
              fontSize="20px"
              fontWeight="semibold"
              color="blue.400"
            >{`${
              user.codigoPostal ? user.codigoPostal : "Sin Código Postal"
            }`}</Text>
          </Flex>
          <Flex ml="2%">
            <Text fontSize="20px" fontWeight="semibold">
              Productos
            </Text>
            <Button
              fontSize="19px"
              h="25px"
              ml="1%"
              bgColor={state.viewProducts ? "red.400" : "blue.400"}
              pl="1%"
              pr="1%"
              color="black"
              _hover={{ bg: "#404c5a", color: "white" }}
              onClick={() =>
                setState({
                  ...state,
                  viewProducts: state.viewProducts ? false : true,
                })
              }
            >
              {state.viewProducts ? "dejar de ver" : "ver productos"}
            </Button>
          </Flex>
          {state.viewProducts && (
            <Box>
              {user.products.map((p: any) => (
                <Box
                  border="solid 2px blue"
                  borderRadius="30px"
                  ml="4%"
                  mb="1%"
                  mr="4%"
                >
                  <Flex ml="2%">
                    <Text fontSize="20px" fontWeight="semibold">
                      titulo:
                    </Text>
                    <Text
                      ml="1%"
                      fontSize="20px"
                      fontWeight="semibold"
                      color="blue.400"
                    >
                      {p.title}
                    </Text>
                  </Flex>
                  <Flex ml="2%">
                    <Text fontSize="20px" fontWeight="semibold">
                      Descripción:
                    </Text>
                    <Text
                      ml="1%"
                      fontSize="20px"
                      fontWeight="semibold"
                      color="blue.400"
                    >
                      {p.description}
                    </Text>
                  </Flex>
                  <Flex ml="2%">
                    <Text fontSize="20px" fontWeight="semibold">
                      Precio:
                    </Text>
                    <Text
                      ml="1%"
                      fontSize="20px"
                      fontWeight="semibold"
                      color="blue.400"
                    >
                      {p.price}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserCard;
