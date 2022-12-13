
import { string, z } from "zod";
import { router, publicProcedure } from "../trpc";


export const productRouter = router({
    createProducts: publicProcedure
    .input(z.object({title: z.string(),price: z.string(),category: z.string(),
    description: z.string(),availability: z.object({available:z.boolean(),
    dateAvailable:z.array(z.string(),z.string())
       })
     })
    )
    .mutation(async ({ctx,input}) => {
     const {title,price,category,description,availability} = input
     const product = await ctx.prisma.product.create({
        data: {
           title,
           price,
           category,
           description,
           availability,
           user: {
            connect: {
             id: '639640531a4b6c6f07111635'
            }
           },
           paymentMethod: {
            connect: {
              paymentName: 'Reba'
            }
           }
        },
        include: {
          user: true,
        }
     })
    }),
    deleteProduct: publicProcedure
    .mutation(async ({ctx})=>{
      const deleteProduct = await ctx.prisma.user.update({
        where: {
          id: '6395a57846a0e8adb17b8257',
        },
        data: {
          products: {
            deleteMany: [{ id: '6395dd0bc06f1d7ba549237a' }],
          },
        },
      })
    }),
    updateProduct: publicProcedure
    .mutation(async ({ctx})=>{
      const updateProduct = await ctx.prisma.user.update({
        where: {
          id: '6395a57846a0e8adb17b8257',
        },
        data: {
          products: {
            update: {
              where: {
                id:'6395d258c9f34b57356092e9'
              },
              data: {
                title: 'Moto Voladora',
                price: '5,50'
              }
            },
          },
        },
      })
    })
});