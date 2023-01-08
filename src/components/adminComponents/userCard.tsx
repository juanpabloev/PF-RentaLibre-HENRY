import React, { useState } from "react";
import { Box, Text, Input, Img, Button, Flex, Heading } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import PopUpComponent from "./popUpComponent";
import Product from "./product";
import DashboardRentedProducts from "../profileComponents/dashboardRentedProducts";

interface Props {
  user: any;
}

const UserCard = ({ user }: Props) => {
  const allUsers = trpc.user.getAllUsers.useQuery().data;
  const userFiltered = allUsers?.find((u)=>u.id === user.id)
  const banUser = trpc.user.banUser.useMutation()
  const { data: session } = useSession();
  const [state, setState] = useState({
    viewProducts: false,
    viewUser: false,
    bannedUser: userFiltered?.banned,
    showPopUp:false,
    seeTransactions:false,
  });

     function handleBan () {
     banUser.mutateAsync({banned:state.bannedUser ? false : true,userId:user.id})
    .then(data => setState(prevState=> {return {...prevState,bannedUser:data.banned,showPopUp:true}}))
  }
  if (state.showPopUp){
    setTimeout(()=>{
      setState(prevState=> {return {...prevState,showPopUp:false}})
      },3000)
  }

  return (
    <Box>
      { state.showPopUp && <PopUpComponent user={user} state={state}/>}
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
          position='inherit'
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
              bgColor={ state.bannedUser ? 'green.400' : "red.400"}
              color="black"
              _hover={{ bg: "#404c5a", color: "white" }}
              onClick={handleBan}
              position='inherit'
            >
              {state.bannedUser ? 'desbloquear' : 'bloquear'}
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
              {user.products.map((p: any)=> <Product key={p.id} product={p}/>)}
            </Box>
          )}
          <Box>
           <Flex flexDirection="column" w={{ base: "100%", lg: "100%" }}>
          <Flex w="100%" justifyContent="center" mt="30px">
            <Button
              mb='1%'
              onClick={() =>
                setState({
                  ...state,
                  seeTransactions: state.seeTransactions ? false : true,
                })
              }
              _hover={{ bg: "#404c5a", color: "white" }}
            >
              Transacciones
            </Button>
          </Flex>
          {state.seeTransactions ? <DashboardRentedProducts user={{...userFiltered,admin:true}} />: null}
        </Flex>
        </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserCard;
