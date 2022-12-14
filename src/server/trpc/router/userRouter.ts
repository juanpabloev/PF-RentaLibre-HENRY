
import { z } from "zod";
import { router, publicProcedure } from "../trpc";


export const  userRouter = router({
createUser: publicProcedure
.input(z.object({
name: z.string(),lastName: z.string(),password: z.string(),userName: z.string(), email: z.string()
     }
  ))
.mutation(async({ctx,input}) => {
    const {name,lastName,userName,password,email} = input
    try {
   const user = await ctx.prisma.user.create({
   data: {
    name,
    lastName,
    userName,
    password,
    email,
   }
 })
    } catch (error) {
        console.log(error)
    }
}),
makeTransaction: publicProcedure
.mutation(async ({ctx,input}) => {
 const ratingProduct = await ctx.prisma.transanction.create({
    data: {
     paymentMethod: {
      connect: {
       paymentName: "Mercado Pago"
      }
    },
     product: {
      connect: {
       id:'6394dcd65d08a717b149339f'
      }
    },
    buyer: {
      connect: {
        id: '63948d191794cc8c855be54a'
        }
      },
      seller: {
        connect: {
          id: '6395201a068b40f2f8d23356'
          }
        }
     },
     include: {
      buyer: true,
      seller: true,
      product: true
     }
   })
 }),
 userDelete: publicProcedure
 .mutation(async({ctx})=>{
  const paymentMethod = await ctx.prisma.user.update({
    where: {
      id: '63948d191794cc8c855be54a'
    },
   data: {
     active: false
   }
  })
}),
 createPaymentMethod: publicProcedure
 .mutation(async({ctx})=>{
   const paymentMethod = await ctx.prisma.paymentMethod.create({
    data: {
      paymentName: 'Reba',
      type: 'Efectivo'
    }
   })
 }),
 addFavorite: publicProcedure
 .mutation(async ({ctx})=> {
  const favorite = await ctx.prisma.favorito.create({
    data: {
      user: {
        connect: {
          id: '6395201a068b40f2f8d23356'
        }
      },
      product: {
        connect: {
          id: '6394daf55d08a717b149339c'
        }
      }
    }
   })
 }),
 deleteFavorite: publicProcedure
 .mutation(async ({ctx})=> {
  const favorite = await ctx.prisma.favorito.delete({
    where: {
      id: '63962642c06f1d7ba549237d'
    }
   })
 })
})