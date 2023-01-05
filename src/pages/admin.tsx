import React, {useEffect, useRef, useState} from 'react';
import { Box, Text, Input, Img, Button, Flex } from "@chakra-ui/react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const Admin = () => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-proyect-ryksx',
  });

  const chartBox = useRef<any>(null);
  const chartBox1 = useRef<any>(null);
  const [rendered, setRendered] = useState(false);
  const [activeUsers] = useState(sdk.createChart({chartId:'63b41236-b222-490f-8ba1-6652df7ad91a'}));
  const [porsentageOfProductsByCategory] = useState(sdk.createChart({chartId:'63b46543-b99d-4f50-87f8-82b42cf67c9a'}));
  useEffect(() => {
    activeUsers.render(chartBox.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [activeUsers]);
  useEffect(() => {
    porsentageOfProductsByCategory.render(chartBox1.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [porsentageOfProductsByCategory]);

  return (
    <Flex justifyContent='space-between' wrap='wrap'>
  <Flex flexDirection='column' >
  <Box ml='1%' mt='2%' h='400px' w='500px' ref={chartBox}/>
  <Button onClick={()=>activeUsers.refresh()} w='16%' ml='1%' color='blue' _hover={{ bg: "#404c5a", color: "white" }}>Recargar</Button>
  </Flex>
  <Flex flexDirection='column' >
  <Box h='400px' w='500px' ref={chartBox1}/>
  <Button onClick={()=>porsentageOfProductsByCategory.refresh()} w='16%' ml='1%' color='blue' _hover={{ bg: "#404c5a", color: "white" }}>Recargar</Button>
  </Flex>
  </Flex>
  );
};


export default Admin;