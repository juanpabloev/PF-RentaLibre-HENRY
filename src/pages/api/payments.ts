import { type NextApiRequest, type NextApiResponse } from "next";

export const config = {
  api: {
      externalResolver: true
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
    const topic = query.topic || query.type;
    console.log(topic)
    var merchant_order;
    switch(topic){
      case "payment":
        const payment_id = query.id || query['data.id'];
        const payment = await fetch("https://api.mercadopago.com/v1/payments/"+payment_id, {
          method: 'GET',
          headers: {
            Authorization: `Bearer APP_USR-5672095275524228-121515-ef3e594e4fc515b3e4d7d98cff8d97e1-1263932815`
        }}).then(res => res.json());
        merchant_order = await fetch("https://api.mercadopago.com/merchant_orders/"+payment.order.id, {
          method: 'GET',
          headers: {
            Authorization: `Bearer APP_USR-5672095275524228-121515-ef3e594e4fc515b3e4d7d98cff8d97e1-1263932815`
        }}).then(res => res.json());
        console.log(merchant_order)
        break
      case "merchant_order":
        const order_id = query.id
        merchant_order = await fetch("https://api.mercadopago.com/merchant_orders/"+order_id, {
          method: 'GET',
          headers: {
            Authorization: `Bearer APP_USR-5672095275524228-121515-ef3e594e4fc515b3e4d7d98cff8d97e1-1263932815`
        }}).then(res => res.json());
        console.log(merchant_order)
        break
    }
  };