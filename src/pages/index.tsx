import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import CardProductHome from '../components/CardProductHome';
import Carusel from '../components/Carusel';

interface Item {
  id: number;
  productName: string;
  productPrice: number;
  userName: string;
  photos: string;
  description: string;
  fecha: string;
  category: string;
  available: boolean;
}

interface Props {
  data: Item[];
  dataCarusel: Carusel[];
}

interface Carusel {
  id: number;
  image: string;
}



export default function Page({ data, dataCarusel }: Props) {
  
  return (
    <>
      <Carusel dataCarusel={dataCarusel} />
      <SimpleGrid columns={3} spacingX="0px" spacingY="0px">
      {data?.map((p) => (
              <CardProductHome
                productName={p.productName}
                photo={p.photos}
                productPrice={p.productPrice}
                id={p.id}
                category={p.category}
                fecha={p.fecha}
              />
            ))}
      </SimpleGrid>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/productsCollection");
  const data = await res.json();
  const resCarusel = await fetch("http://localhost:3001/carrousel");
  const dataCarusel = await resCarusel.json();
  return {
    props: {
      data,
      dataCarusel,
    },
  };
};
