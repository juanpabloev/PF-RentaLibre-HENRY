import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { trpc } from "../utils/trpc";
import UserCard from "../components/adminComponents/userCard";

const Admin = () => {

  const [state, setState] = useState<any>({
    filterdUsers: [],
    search: "",
  });
  const transaction = trpc.user.makeTransaction.useMutation()
  const allUsers = trpc.user.getAllUsers.useQuery().data;
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-proyect-ryksx",
  });

  const chartBox = useRef<any>(null);
  const chartBox1 = useRef<any>(null);
  const chartBox2 = useRef<any>(null);

  const [rendered, setRendered] = useState(false);
  const [activeUsers] = useState(
    sdk.createChart({ chartId: "63b41236-b222-490f-8ba1-6652df7ad91a" })
  );
  const [porsentageOfProductsByCategory] = useState(
    sdk.createChart({ chartId: "63b46543-b99d-4f50-87f8-82b42cf67c9a" })
  );
  const [numOfUsersByProvince] = useState(
    sdk.createChart({ chartId: "63b877f7-9f2b-431b-8ac3-42677196dec9" })
  );

  useEffect(() => {
    activeUsers
      .render(chartBox.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [activeUsers]);
  useEffect(() => {
    porsentageOfProductsByCategory
      .render(chartBox1.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [porsentageOfProductsByCategory]);
  useEffect(() => {
    numOfUsersByProvince
      .render(chartBox2.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [numOfUsersByProvince]);

  function onChange(value: any) {
    const filterdUsers = allUsers?.filter(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.lastName?.toLowerCase().includes(value)
    );
    setState({ ...state, filterdUsers: filterdUsers, search: value });
  }
  return (
    <Box>
      <Input
        mb="2%"
        placeholder="buscar usuarios..."
        onChange={(e) => onChange(e.target.value)}
        w="20%"
        ml="2%"
        mt="1%"
      />
      {state.search.length !== 0 &&
        state.filterdUsers?.slice(0, 5).map((u: any) => <UserCard key={u.id} user={u}/>)}
      <Flex justifyContent="space-around" wrap="wrap">
        <Flex
          flexDirection="column"
          ml="2%"
          mt="2%"
          mb="2%"
          borderColor="green.200"
          border="solid 2px"
          borderRadius="30px"
        >
          <Box ml="1%" mt="2%" h="400px" w="500px" ref={chartBox} pr="2%" />
          <Button
            onClick={() => activeUsers.refresh()}
            w="16%"
            ml="3%"
            mb="1%"
            color="blue"
            _hover={{ bg: "#404c5a", color: "white" }}
          >
            Recargar
          </Button>
        </Flex>
        <Flex
          flexDirection="column"
          ml="2%"
          mt="2%"
          mb="2%"
          borderColor="green.200"
          border="solid 2px"
          borderRadius="30px"
        >
          <Box ml="1%" mt="2%" h="400px" w="500px" ref={chartBox1} pr="2%" />
          <Button
            onClick={() => porsentageOfProductsByCategory.refresh()}
            w="16%"
            ml="3%"
            mb="1%"
            color="blue"
            _hover={{ bg: "#404c5a", color: "white" }}
          >
            Recargar
          </Button>
        </Flex>
        <Flex
          flexDirection="column"
          ml="2%"
          mt="2%"
          mb="2%"
          borderColor="green.200"
          border="solid 2px"
          borderRadius="30px"
        >
          <Box ml="1%" mt="2%" h="400px" w="500px" ref={chartBox2} pr="2%" />
          <Button
            onClick={() => numOfUsersByProvince.refresh()}
            w="16%"
            ml="3%"
            mb="1%"
            color="blue"
            _hover={{ bg: "#404c5a", color: "white" }}
          >
            Recargar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Admin;
