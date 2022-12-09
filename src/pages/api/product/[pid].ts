
import articulos from '../../../productListScratchData/articulos.json';
//import ProductDetail from '../../productDetail/[id]';

/* export default async (req: any, res: any) => {
    const {pid} = req.query;
    const product = await articulos.productsCollection?.findOne({_id: pid});
    res.status(200).json(product)
} */

export default async (req: any, res: any) => {
    const {pid} = req.query;
    const product = await articulos.productsCollection.find(p => p.id.toString() === pid)
    console.log(product)
    res.status(200).json(product)
}
