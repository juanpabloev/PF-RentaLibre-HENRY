import articulos from "../productListScratchData/articulos.json";
import CardProductList from "../components/CardProductList";
import styles from "../styles/productList.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RouterOutputs, trpc } from "../utils/trpc";
import { FaLeaf } from "react-icons/fa";

// para traer del back:

/* export async function getStaticProps(context) {
    const res = await fetch('..url..');
    const data = await res.json();

    return {
        props: {products: data}
    }
} */

// export const getServerSideProps = async () => {
//   const res = trpc.product.getProducts.useQuery({ limit: 100, page: 1 }).data;
//   const productsData = res.data;
//   return {
//     props: {
//       productsData,
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
//   productsData: RouterOutputs["product"]["getProducts"];
// }

// trae de local host 3001 - json server
// function bringData(category?: string) {
//   let data: RouterOutputs["product"]["getProducts"];

//   if (category) {
//     data = trpc.product.getProductByCategory.useQuery({
//       categoryName: category,
//     });
//   } else {
//     data = trpc.product.getProducts.useQuery({ page: 1, limit: 10 });
//   }
//   return data;
// }
//export default function Productlist({ productsData }: Props) {
export default function Productlist() {
  const router = useRouter();
  const { category, q } = router.query;
  //trae del back
  const utils = trpc.useContext();
  let products;
  if (category || q) {
    console.log(category);
    if (category && !(typeof q == undefined)) {
      products = trpc.product.getProductByCategory.useQuery({
        categoryName: category,
      }).data;
    } else if (q && !category) {
      products = trpc.product.getProductByTitle.useQuery({ title: q }).data;
    } else {
      products = trpc.product.getProductByCategory.useQuery({
        categoryName: category,
        title: q,
      }).data;
    }
  } else {
    products = trpc.product.getProducts.useQuery({ limit: 10, page: 1 }).data;
  }
  const [data, setData] = useState();
  // const [isLoading, setLoading] = useState(false);
  // if (isLoading) return <p>Loading...</p>;
  //para que refresque los datos
  useEffect(() => {
    setData(products);
  }, [products]);

  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <div className={styles.cardsDivProdHome}>
        {data?.map((p) => (
          <CardProductList
            productName={p.title}
            photo={p.pictures[0]}
            productPrice={p.price}
            id={p.id}
            key={p.id}
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
