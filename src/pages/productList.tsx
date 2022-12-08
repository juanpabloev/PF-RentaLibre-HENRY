import articulos from '../productListScratchData/articulos.json';
import CardProductList from '../components/CardProductList';


// para traer del back: 

/* export async function getStaticProps(context) {
    const res = await fetch('..url..');
    const data = await res.json();

    return {
        props: {products: data}
    }
} */


function productlist() {
    console.log(articulos.productsCollection[0]?.["photo/s"])

    return (
        <div>
            <h1>esto es un product list</h1>
            <div className='card.prodList'>
                {
                    articulos.productsCollection?.map((p) => (
                   <CardProductList
                        productName={p.productName}
                        photo={p["photo/s"]}
                        productPrice={p.productPrice} id={undefined}         
                    />           
                    )) 
                }
            </div>    
        </div>
    ) 
  }
  
  export default productlist;

