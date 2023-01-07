import React from "react";
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";

const PhoneNumberInput = ({ setState, setStateError, stateError, state }) => {
  function verifyNum(e, setStateError) {
    setState((prevState) => {
      return { ...prevState, phoneNumber: e.target.value };
    });

    let verify = /^\d+$/.test(e.target.value);
    let verifyNumDash = /^\d+\-\d+$/.test(e.target.value);
    if (verify && e.target.value.length === 10) {
      setStateError((prevState) => {
        return { ...prevState, inputPhone: false };
      });
    } else if (verifyNumDash && e.target.value.length === 11) {
      setStateError((prevState) => {
        return { ...prevState, inputPhone: false };
      });
    } else {
      setStateError((prevState) => {
        return { ...prevState, inputPhone: true };
      });
    }
  }

  return (
    <Box>
      {stateError.inputPhone ? (
        <Box>
          <Flex ml="2%" w="100%">
            <Text color="red">Error</Text>
            <Text color="grey" ml="1%">
              {`Ejem: 3434-234567 o 3434234567`}{" "}
            </Text>
          </Flex>
          <Text color="grey" ml="2%">
            {`código de area - num (solo 10 digitos)`}{" "}
          </Text>
        </Box>
      ) : null}
      <Flex mt="1%" w="100%">
        <Text ml="2%" mr="1%">{`(+54)`}</Text>
        <Input
          value={state.phoneNumber}
          h="30px"
          borderColor={stateError.inputPhone && "red"}
          _focusVisible={{
            borderColor: stateError.inputPhone ? "red" : "none",
          }}
          _hover={{ borderColor: stateError.inputPhone ? "red" : "none" }}
          w="200px"
          placeHolder="Cel..."
          fontSize="20px"
          onChange={(e) => verifyNum(e, setStateError)}
        />
      </Flex>
    </Box>
  );
};

export default PhoneNumberInput;