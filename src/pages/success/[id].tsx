import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const Success = () => {
    const session = useSession();
    const router = useRouter();
    const { payment_id, id }: any = router.query;
    const product = trpc.product.getProductByID.useQuery({ id }).data;
    const payment = trpc.user.makeTransaction.useMutation();
    const createNotification = trpc.notification.createNotification.useMutation();
    const notification = trpc.notification.getNotification.useQuery({
        userId: session?.data?.userDB?.id,
      }).data;
    const [submit, setSubmit] = React.useState(
        {
            comprobate: false
        }
    );

    
useEffect(() => {
    if(product !== undefined){
        if(submit.comprobate === false){
            setSubmit((prevState) => {return {
                prevState,
                comprobate: true}})
            payment.mutate({ 
                mercadoPagoID: payment_id,
                sellerId: product?.userId!,
                buyerId: session?.data?.userDB?.id,
                productId: product?.id!,
            })
            createNotification.mutate({
                type: "Alquiler",
                message: "Tu producto ha sido alquilado",
                productId: product?.id!,
                id:product?.userId!,
                productName: product?.title!,
                productImage: product?.pictures[0]!,
            })
    }
}
}, [createNotification, payment, payment_id, product, session?.data?.userDB?.id, submit.comprobate])
        
    if (!session) {
        return (
            <Box textAlign="center" py={10} px={6}>
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    No tienes permiso para ver esta pagina
                </Heading>
            </Box>
        );
    }
    return(
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Image
        rounded={'lg'}
        height={230}
        width={282}
        objectFit={'cover'}
        src={product?.pictures[0]}
        alt={product?.title}
        />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {session?.data?.user?.name}, 
        has rentado {product?.title} con exito
      </Heading>
      <Text color={'gray.500'}>
        #{payment_id} es su id de transaccion,
      </Text>
    </Box>
  );
}    

export default Success;