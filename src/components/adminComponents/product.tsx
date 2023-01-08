import React, { useState } from "react";
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";
import Link from 'next/link';
import { trpc } from "../../utils/trpc";

interface Props {
    product: any
}

const Product = ({product}:Props) => {
    const [state, setState] = useState({
        disabledProduct: product.disabled
      });
    const disableProduct = trpc.product.disableProduct.useMutation()
      function handleDisableProduct () {
        disableProduct.mutateAsync({productId:product.id,disabled: state.disabledProduct ? false : true})
        .then(data => setState(prevState=> {return {...prevState,disabledProduct: data.disabled}}))
       }

    return (
        <Box
        border="solid 2px blue"
        borderRadius="30px"
        ml="4%"
        mb="1%"
        mr="4%"
      >
        
        <Flex ml="2%" justifyContent='space-between'>
          <Text fontSize="20px" fontWeight="semibold" mr='2%'>
            Artículo:
          </Text>
          <Link href={`/productDetail/${product.id}`}>
          <Text
            display='inline-block'
            fontSize="20px"
            fontWeight="semibold"
            color="blue.400"
          >
            {product.title}
          </Text>
          </Link>   
 <Button
    fontSize="19px"
    h="25px"
    mt="2px"
    ml="2%"
    mr='2%'
    bgColor={ state.disabledProduct ? 'green.400' : "red.400"}
    color="black"
    _hover={{ bg: "#404c5a", color: "white" }}
    onClick={handleDisableProduct}
    position='inherit'
  >
    {state.disabledProduct ? 'habilitar' : 'deshabilitar'}
  </Button>
        </Flex>
      </Box>
  );
};

export default Product;