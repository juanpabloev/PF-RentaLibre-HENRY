import { string, z } from "zod";
import { router, publicProcedure } from "../trpc";


export const productRouter = router({
getProducts: publicProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input;

      const products = await ctx.prisma.product.findMany({
        skip: page * limit - limit,
        take: limit,
      });

      return products;
    }),
  getProductByID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const productById = await ctx.prisma.product.findUnique({
        where: {
          id,
        },
      });

      return productById;
    }),
  getProductByName: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { title } = input;

      const productByName = await ctx.prisma.product.findMany({
        where: {
          title,
        },
      });

      return productByName;
    }),
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
