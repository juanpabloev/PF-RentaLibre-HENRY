import articulos from '../productListScratchData/articulos.json';
import CardProductList from '../components/CardProductList';
import styles from '../styles/productList.module.css';
import React from 'react';


// para traer del back: 

/* export async function getStaticProps(context) {
    const res = await fetch('..url..');
    const data = await res.json();

    return {
        props: {products: data}
    }
} */


export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:3001/productsCollection')
    const data = await res.json()
   
    return {
        props: {
            data,
        }
    }
}

interface Item {
    id: number;
    productName: string;
    productPrice: number;
    userName: string;
    ["photo/s"]: string;
    description: string;
    fecha: string;
    category: string;
    available: boolean;
}

interface Props {
    data: Item[]
}


// trae de local host 3001 - json server

export default function Productlist ({data}: Props) {
    /* console.log(articulos.productsCollection[0]?.["photo/s"]) */
    //console.log(articulos.productsCollection[0])

    return (
        <div>
            <h1>esto es un product list</h1>
            <div className={styles.cardsDivProdHome}>
                {
                    data?.map((p) => (
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


