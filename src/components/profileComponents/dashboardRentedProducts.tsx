import { Box, Text, Button, Flex } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from 'next/link';

interface Props {
  user: any;
}

export default function DashboardRentedProducts({user}:Props) {
  const [seller, setSeller] = useState(true);

  return (
    <Box ml='1%' mb='1%'>
      <Flex mt="10px" justifyContent='center'>
        <Button
        _hover={{bg:"#404c5a",color: 'white'}}
          onClick={() => setSeller(true)}
          color={seller ? "blue" : "black"}
          fontWeight="semibold"
        >
         {user.admin ? 'Articulos Que Rentó el usuario' : 'Articulos Que Renté'}
        </Button>
        <Button
        _hover={{bg:"#404c5a",color: 'white'}}
          onClick={() => setSeller(false)}
          ml='2%'
          color={!seller ? "blue" : "black"}
          fontWeight="semibold"
        >
          {user.admin ? 'Articulos Que se le rentó al usuario' : 'Articulos Rentados'} 
        </Button>
      </Flex>

      <Box mt="20px" ml='5%'>
        {user && seller
          ? user.seller.map((trans:any) => {
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
                             <Link href={`/productDetail/${trans.product.id}`}>
                             {trans.product.title}
                             </Link>
                          
                          </Box>

                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Text
                          fontWeight="semibold"
                          fontSize="16px"
                          color='blackAlpha.900'
                          display="flex"
                        >
                          Pricio del producto:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                            {trans.product.price}
                          </Text>
                        </Text>
                        <Text
                           fontWeight="semibold"
                           fontSize="16px"
                           color='blackAlpha.900'
                           display="flex"
                        >
                          TransactionID:
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                            {" "}
                            {trans.transactionID}
                          </Text>
                        </Text>
                        <Text
                           fontWeight="semibold"
                           fontSize="16px"
                           color='blackAlpha.900'
                           display="flex"
                        >
                          Rentado a:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                            {`${trans.buyer.name ? trans.buyer.name : ''} ${trans.buyer.lastName ? trans.buyer.lastName : ''}`} 
                          </Text>
                        </Text>
                        <Text
                            fontWeight="semibold"
                            fontSize="16px"
                            color='blackAlpha.900'
                            display="flex"
                        >
                          Metodo de Pago:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                            {trans.methodName}
                          </Text>
                        </Text>
                        <Text
                            fontWeight="semibold"
                            fontSize="16px"
                            color='blackAlpha.900'
                            display="flex"
                        >
                          Fecha y hora:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
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
            user.buyer.map((trans:any) => {
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
                             fontWeight="semibold"
                             fontSize="16px"
                             color='blackAlpha.900'
                             display="flex"
                        >
                          Pricio del producto:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                            {trans.product.price}
                          </Text>
                        </Text>
                        <Text
                            fontWeight="semibold"
                            fontSize="16px"
                            color='blackAlpha.900'
                            display="flex"
                        >
                          TransactionID:
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                            {" "}
                            {trans.transactionID}
                          </Text>
                        </Text>
                        <Text
                           fontWeight="semibold"
                           fontSize="16px"
                           color='blackAlpha.900'
                           display="flex"
                        >
                          Rentador:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                          {`${trans.seller?.name ? trans.seller.name : ''} ${trans.seller?.lastName ? trans.seller.lastName : ''}`}
                          </Text>
                        </Text>
                        <Text
                           fontWeight="semibold"
                           fontSize="16px"
                           color='blackAlpha.900'
                           display="flex"
                        >
                          Metodo de Pago:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
                            {trans.methodName}
                          </Text>
                        </Text>
                        <Text
                             fontWeight="semibold"
                             fontSize="16px"
                             color='blackAlpha.900'
                             display="flex"
                        >
                          Fecha y hora:{" "}
                          <Text fontSize="16px" ml="5px" color='blue.500' fontWeight="semibold">
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
