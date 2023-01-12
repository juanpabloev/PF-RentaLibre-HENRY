import React from "react";
import { Box, Heading, Text} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { WarningIcon } from "@chakra-ui/icons";

export default function Fail () {
    const router = useRouter();
    const { id }: any = router.query;
    const product = trpc.product.getProductByID.useQuery({ id }).data;
    
    setTimeout(() => {
            router.push(`/productDetail/${id}`)
        }, 5000)
    
    return(
    <Box textAlign="center" py={10} px={6}>
      <WarningIcon boxSize={'50px'} color={'red.500'}/>
      <Heading as="h2" size="xl" mt={6} mb={2}>Su pago al producto: {product?.title} sido rechazado por algun motivo, por favor intente de nuevo mas tarde</Heading>
        <Text fontSize="lg" mt={2} mb={6}>
            Si el problema persiste, por favor contacte con el vendedor
        </Text>
        
    </Box>
    )
}