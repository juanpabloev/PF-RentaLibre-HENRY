import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        lastName: z.string(),
        password: z.string(),
        userName: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, lastName, userName, password, email } = input;
      try {
        const user = await ctx.prisma.user.create({
          data: {
            name,
            lastName,
            userName,
            password,
            email,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  makeTransaction: publicProcedure
  .input(z.object({
    mercadoPagoID: z.string(),
    sellerId: z.string(),
    buyerId: z.string(),
    productId: z.string()
  }))
  .mutation(async ({ ctx, input }) => {
    const { mercadoPagoID, sellerId, buyerId, productId } = input;
    const createTransaction = await ctx.prisma.transanction.create({
      data: {
        paymentMethod: {
          connect: {
            paymentName: "Mercado Pago",
          },
        },
        mercadoPagoID,
        product: {
          connect: {
            id: productId,
          },
        },
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        seller: {
          connect: {
            id: sellerId,
          },
        },
      },
      include: {
        buyer: true,
        seller: true,
        product: true,
      },
    });
    return createTransaction;
  }),
  userDelete: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      const deleteUser = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          active: false,
        },
      });
    }),
  createPaymentMethod: publicProcedure.mutation(async ({ ctx }) => {
    const paymentMethod = await ctx.prisma.paymentMethod.create({
      data: {
        paymentName: "Reba",
        type: "Efectivo",
      },
    });
  }),
  addFavorite: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isFavorited = await ctx.prisma.favorito.findMany({
        where: {
          productId: input.productId,
          active: true,
          userId: ctx.session.user.id,
        },
      });
      if (isFavorited.length <= 0) {
        const favorite = await ctx.prisma.favorito.create({
          data: {
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            product: {
              connect: {
                id: input.productId,
              },
            },
          },
        });
        return favorite;
      } else {
        return "exist";
      }
    }),
  deleteFavorite: protectedProcedure
    .input(
      z.object({
        favoriteId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const favorite = await ctx.prisma.favorito.update({
        where: {
          id: input.favoriteId,
        },
        data: {
          active: false,
          detetedAt: new Date().toISOString(),
        },
      });
      return favorite;
    }),
  getUser: protectedProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId || ctx.session.user.id,
        },
        include: {
          buyer: {
            include: {
              buyer:true,
              product: true,
              seller: true,
            },
          },
          seller: {
            include: {
              seller: true,
              product: true,
              buyer: true,
            },
          },
          products: {
            include : {
              user: true
            }
          }
        },
      });
      return user;
    }),
  getFavorites: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const favorites = await ctx.prisma.favorito.findMany({
        where: {
          userId: ctx.session.user.id,
          active: true,
        },
        include: {
          product: true,
        },
      });
      return favorites;
    }),
  getFavoritesById: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { productId } = input;
      const favorites = await ctx.prisma.favorito.findMany({
        where: {
          userId: ctx.session.user.id,
          productId,
        },
        include: {
          product: true,
        },
      });
      return favorites;
    }),
  userUpdate: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        name: z.string().optional(),
        userPicture: z.string().optional(),
        lastName: z.string().optional(),
        codigoPostal: z.string().optional(),
        countryName: z.string().optional(),
        stateName: z.string().optional(),
        cityName: z.string().optional(),
        phoneNumber: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        userPicture,
        lastName,
        codigoPostal,
        countryName,
        stateName,
        cityName,
        phoneNumber,
        userId,
      } = input;
      const updateUser = await ctx.prisma.user.update({

      where: {
        id:userId
      },
      data: {
      phoneNumber,
      name,
      image:userPicture,
      lastName,
      codigoPostal,
      location: {
        country:countryName,
        state:stateName,
        city:cityName
      },
      }
    })
    return updateUser
  }), 
  banUser: publicProcedure
  .input(z.object({
    banned: z.boolean(),
    userId: z.string()
  }))
  .mutation(async ({ctx,input})=>{
    const {userId,banned} = input
    const banUser = await ctx.prisma.user.update({
    where: {
      id:userId
    },
    data: {
    banned
    }
  })
  return banUser
}),
  getAllUsers: publicProcedure
    .query(async ({ ctx}) => {
      const users = await ctx.prisma.user.findMany({
        include: {
          seller: {
            include:{
              seller:true,
              buyer: true,
              product: true
            }
          },
          buyer: {
            include:{
              buyer: true,
              seller: true,
              product: true
            }
          },
          products: true
        }
      });
      return users;

    }),
});
