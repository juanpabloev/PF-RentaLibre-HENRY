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
  makeTransaction: publicProcedure.mutation(async ({ ctx, input }) => {
    const ratingProduct = await ctx.prisma.transanction.create({
      data: {
        paymentMethod: {
          connect: {
            paymentName: "Reba",
          },
        },
        product: {
          connect: {
            id: "639640531a4b6c6f07111635",
          },
        },
        buyer: {
          connect: {
            id: "639ba56718b33ca641acd28f",
          },
        },
        seller: {
          connect: {
            id: "639640531a4b6c6f07111635",
          },
        },
      },
      include: {
        buyer: true,
        seller: true,
        product: true,
      },
    });
  }),

  userDelete: publicProcedure.mutation(async ({ ctx }) => {
    const paymentMethod = await ctx.prisma.user.update({
      where: {
        id: "63948d191794cc8c855be54a",
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
              product: true,
              seller: true,
            },
          },
          seller: {
            include: {
              product: true,
              buyer: true,
            },
          },
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
});
