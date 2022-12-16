import { Box, Text, Button } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function dashboardRentedProducts() {
  const user = trpc.user.getUser.useQuery({
    userId: "639640531a4b6c6f07111635",
  }).data;
  console.log(user);
  const [seller, setSeller] = useState(true);

  return (
    <Box ml="300px">
      <Box mt="50px">
        <Button
          ml="100px"
          onClick={() => setSeller(true)}
          color={seller ? "blue" : "black"}
          fontWeight="semibold"
        >
          Articulos Que Renté
        </Button>
        <Button
          ml="100px"
          onClick={() => setSeller(false)}
          color={!seller ? "blue" : "black"}
          fontWeight="semibold"
        >
          Articulos Rentados
        </Button>
      </Box>

      <Box mt="20px">
        {user && seller
          ? user.seller.map((trans) => {
              return (
                <Box>
                  <Accordion allowToggle w="650px">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontSize="17px"
                            fontWeight="semibold"
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
                          color="#F7C331"
                          display="flex"
                        >
                          Pricio del producto:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
                            {trans.product.price}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          TransactionID:
                          <Text ml="5px" color="black" fontWeight="light">
                            {" "}
                            {trans.transactionID}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          Rentado a:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
                            {trans.buyer.userName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          Metodo de Pago:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
                            {trans.methodName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          Fecha y hora:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
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
                <Box>
                  <Accordion allowToggle w="650px">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontSize="17px"
                            fontWeight="semibold"
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
                          color="#F7C331"
                          display="flex"
                        >
                          Pricio del producto:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
                            {trans.product.price}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          TransactionID:
                          <Text ml="5px" color="black" fontWeight="light">
                            {" "}
                            {trans.transactionID}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          Rentador:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
                            {trans.seller.userName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          Metodo de Pago:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
                            {trans.methodName}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="16px"
                          color="#F7C331"
                          display="flex"
                        >
                          Fecha y hora:{" "}
                          <Text ml="5px" color="black" fontWeight="light">
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
