import articulos from "../productListScratchData/articulos.json";
import CardProductList from "../components/CardProductList";
import styles from "../styles/productList.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// para traer del back:

/* export async function getStaticProps(context) {
    const res = await fetch('..url..');
    const data = await res.json();

    return {
        props: {products: data}
    }
} */

// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:3001/productsCollection");
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };

// interface Item {
//   id: number;
//   productName: string;
//   productPrice: number;
//   userName: string;
//   ["photos"]: string;
//   description: string;
//   fecha: string;
//   category: string;
//   available: boolean;
// }

// interface Props {
//   data: Item[];
// }

// trae de local host 3001 - json server

// export default function Productlist({ data }: Props) {
export default function Productlist() {
  const router = useRouter();
  const { q, category } = router.query;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let url = "http://localhost:3001/productsCollection?";
    if (q) url += `&q=${q}`;
    if (category) url += `&category=${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [q, category]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <div className={styles.cardsDivProdHome}>
        {data?.map((p) => (
          <CardProductList
            productName={p.productName}
            photo={p["photos"]}
            productPrice={p.productPrice}
            id={p.id}
          />
        ))}
      </div>
    </div>
  );
}

// esta de aca abajo trae de JSON local
/*   function productlist() {
    
    console.log(articulos.productsCollection[0])

    return (
        <div>
            <h1>esto es un product list</h1>
            <div className={styles.cardsDivProdHome}>
                {
                    articulos.productsCollection?.map((p) => (
                   <CardProductList
                        productName={p.productName}
                        photo={p["photo/s"]}
                        productPrice={p.productPrice} 
                        id={p.id}         
                    />           
                    )) 
                }
            </div>    
        </div>
    ) 
  } */

//export default productlist;
