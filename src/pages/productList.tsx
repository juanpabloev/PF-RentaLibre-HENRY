import articulos from '../productListScratchData/articulos.json';
import CardProductList from '../components/CardProductList';
import styles from '../styles/productList.module.css';


// para traer del back: 

/* export async function getStaticProps(context) {
    const res = await fetch('..url..');
    const data = await res.json();

    return {
        props: {products: data}
    }
} */


function productlist() {
    /* console.log(articulos.productsCollection[0]?.["photo/s"]) */
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
  }
  
  export default productlist;

