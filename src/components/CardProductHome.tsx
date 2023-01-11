//import React from "react";
import Link from 'next/link';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image
  } from '@chakra-ui/react';
  
  export default function CardProductHome({ id, photo, productName, productPrice, category, fecha} : any) {
    return (
        <Center py={12}>
          <Link href={`/productDetail/${id}`}>
          <Box
            role={'group'}
            p={6}
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
              rounded={'lg'}
              mt={-12}
              pos={'relative'}
              height={'230px'}
              _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                backgroundImage: `url(${photo})`,
                filter: 'blur(15px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(20px)',
                },
              }}>
              <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={photo}
                alt={productName}
              />
            </Box>
            <Stack pt={10} align={'center'}>
              <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                {category}
              </Text> 
              <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                {productName}
              </Heading>
              <Stack direction={'row'} align={'center'}>
                <Text fontWeight={800} fontSize={'xl'}>
                  ${productPrice} / {fecha}
                </Text>
              </Stack>
            </Stack>
          </Box>
          </Link>
        </Center>
    );
  }