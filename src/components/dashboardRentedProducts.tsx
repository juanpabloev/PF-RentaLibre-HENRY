import { Box, Text, Button, Flex } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function DashboardRentedProducts() {
  const { data: session } = useSession();
  const user = trpc.user.getUser.useQuery({
    userId: session?.userDB.id,
  }).data;
  const [seller, setSeller] = useState(true);

  return (
    <Box ml='1%' mt='3%'>
      <Flex mt="10px" justifyContent='center'>
        <Button
        _hover={{bg:"#404c5a",color: 'white'}}
          onClick={() => setSeller(true)}
          color={seller ? "blue" : "black"}
          fontWeight="semibold"
        >
          Articulos Que Renté
        </Button>
        <Button
        _hover={{bg:"#404c5a",color: 'white'}}
          onClick={() => setSeller(false)}
          ml='2%'
          color={!seller ? "blue" : "black"}
          fontWeight="semibold"
        >
          Articulos Rentados
        </Button>
      </Flex>

      <Box mt="20px" ml='5%'>
        {user && seller
          ? user.seller.map((trans) => {
              return (
                <Box key={trans.transactionID}>
                  <Accordion allowToggle w="85%">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontSize="17px"
                            fontWeight="bold"
                            color="#F7C331"
                          >
                            {trans.product.title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Pricio del producto:{" "}
                          <Text ml="5px" color="blue" fontWeight="bold">
                            {trans.product.price}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          TransactionID:
                          <Text ml="5px" color="blue" fontWeight="bold">
                            {" "}
                            {trans.transactionID}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Rentado a:{" "}
                          <Text ml="5px" color="blue" fontWeight="bold">
                            {trans.buyer.userName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Metodo de Pago:{" "}
                          <Text ml="5px" color="blue" fontWeight="bold">
                            {trans.methodName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Fecha y hora:{" "}
                          <Text ml="5px" color="blue" fontWeight="bold">
                            {trans.createdAt.toString()}
                          </Text>
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              );
            })
          : user &&
            user.buyer.map((trans) => {
              return (
                <Box key={trans.transactionID}>
                  <Accordion allowToggle w="85%">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontSize="17px"
                            fontWeight="bold"
                            color="#F7C331"
                          >
                            {trans.product.title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Pricio del producto:{" "}
                          <Text ml="5px" color="blue" fontWeight="semibold">
                            {trans.product.price}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          TransactionID:
                          <Text ml="5px" color="blue" fontWeight="semibold">
                            {" "}
                            {trans.transactionID}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Rentador:{" "}
                          <Text ml="5px" color="blue" fontWeight="semibold">
                            {trans.seller.userName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Metodo de Pago:{" "}
                          <Text ml="5px" color="blue" fontWeight="semibold">
                            {trans.methodName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="black"
                          display="flex"
                        >
                          Fecha y hora:{" "}
                          <Text ml="5px" color="blue" fontWeight="semibold">
                            {trans.createdAt.toString()}
                          </Text>
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
}
