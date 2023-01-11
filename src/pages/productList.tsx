import CardProductList from "../components/CardProductList";
import styles from "../styles/productList.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

import {
  Box,
  Flex,
  Highlight,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Productlist() {
  const router = useRouter();
  const category: any = router.query.category;
  const q: any = router.query.q;

  const colorBg = useColorModeValue("gray.100", "gray.900");

  //trae del back
  const utils = trpc.useContext();
  let products: any;
  if(products === undefined){
    if (category || q) {
      if (!!category && !q) {
        products = trpc.product.getProductByCategory.useQuery({
          categoryName: category,
        }).data;
      } else if (!!q && !category) {
        products = trpc.product.getProductByTitle.useQuery({ title: q }).data;
      } else {
        products = trpc.product.getProductByTitleAndCategory.useQuery({
          title: q,
          categoryName: category,
        }).data;
      }
    } else {
      products = trpc.product.getProducts.useQuery({ limit: 10, page: 1 }).data;
    }
  }
  const [data, setData] = useState<any>(undefined);
  const [order, setOrder] = useState("Más relevantes");

  function getAvarage(product: any) {
    const avarage = product.rating.map((k: any) => k.stars).reduce((total: any, star: any) => total + star, 0) / product.rating.length;
    return isNaN(avarage) ? 0 : avarage;
  }

  function handleOrder(e: string) {
    if(e === 'relevantes'){
      setOrder("Más relevantes");
      data?.sort((a: any, b: any) => {
      return getAvarage(b) - getAvarage(a);
      });
      }else if(e === 'menor'){
      setOrder("Menor precio");
      data.sort((a: any, b: any) => {
        return a.price - b.price;
      });
    }else if(e === 'mayor'){
      setOrder("Mayor precio");
      data.sort((a: any, b: any) => {
        return b.price - a.price;
      });
    }
  }
  
  //para que refresque los datos
  useEffect(() => {
    setOrder("Más relevantes");
    setData(products);
  }, [products]);

  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <Box bg={colorBg} px={4}>
        <Flex h={8} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Highlight
              query={`${q}`}
              styles={{ px: "1", py: "0", rounded: "full", bg: "orange.100" }}
            >
              {`1 a ${data?.length} de ${data?.length} resultados ${
                q ? `para: ${q}` : ""
              }`}
            </Highlight>
          </Flex>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                Ordenar por: {order}
              </MenuButton>
              <MenuList zIndex={2}>
                <MenuItem onClick={() => handleOrder('relevantes')}>
                  Más relevantes
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleOrder('menor')}>
                  Menor precio
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleOrder('mayor')}>
                  Mayor precio
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <div className={styles.cardsDivProdHome}>
        {data?.map((p: any) => (
          <CardProductList
            productName={p.title}
            photo={p.pictures[0]}
            productPrice={p.price}
            rating={p.rating}
            id={p.id}
            key={p.id}
          />
        ))}
      </div>
    </div>
  );
}
