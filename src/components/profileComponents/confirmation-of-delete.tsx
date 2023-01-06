import React from "react";
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";
import { any } from "zod";
import { trpc } from "../../utils/trpc";
import { signOut } from "next-auth/react";

interface Props {
  setState: any;
  state: any;
  userId: string;
}

const Confirmation = ({ setState, state, userId }: Props) => {
  const deleteU = trpc.user.userDelete.useMutation();

  function deleteUser() {
    signOut();
    deleteU.mutate({ userId });
  }

  return (
    <Box position="absolute" bgColor="blackAlpha.900" w="100%" h="100%">
      <Box
        bgColor="white"
        ml="5%"
        mt="5%"
        borderRadius="20px"
        w="50%"
        textAlign="center"
      >
        <Text fontSize="20px" fontWeight="semibold">
          Seguro de que quieres eliminar esta cuenta?
        </Text>
        <Flex justifyContent="center" pt="1%" pb="2%">
          <Button bgColor="green.400" h="30px" onClick={deleteUser}>
            si
          </Button>
          <Button
            bgColor="red.400"
            ml="2%"
            h="30px"
            onClick={() =>
              setState({ ...state, confirmationOfDeleteUser: false })
            }
          >
            no
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Confirmation;
