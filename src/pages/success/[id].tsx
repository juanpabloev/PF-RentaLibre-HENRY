import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import sendEmail from "../../utils/contact-functions/contact-Email";

export default function success () {
    const session = useSession();
    const router = useRouter();
    const { payment_id, id }: any = router.query;
    const product = trpc.product.getProductByID.useQuery({ id }).data;
    const payment = trpc.user.makeTransaction.useMutation();
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
            sendEmail({
                name: session?.data?.user?.name!,
                email: session?.data?.user?.email!,
                subject: 'Compra realizada',
                message: 'Su compra ha sido realizada con exito, su id de transaccion es: ' + payment_id
            })
    }
}
}, [product])
        
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
        has rentado un {product?.title} con exito
      </Heading>
      <Text color={'gray.500'}>
        #{payment_id} es su id de transaccion,
      </Text>
    </Box>
  );
}    