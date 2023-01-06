import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const notificationRouter = router({
  createNotification: publicProcedure
    .mutation(async ({ ctx }) => {
      const notification = await ctx.prisma.notification.create({
        data: {
          notificationType: {
            id: 1,
            message: "Hola",
            type: "message",
          },
          user: {
            connect: {
              id: "639ba56718b33ca641acd28f"
            }
          },
          userAction: {
            connect: {
              id: "639ba58e18b33ca641acd290"
            }
          }
        },
        include: {
          user: true,
          userAction: true,
    }});
  }),
  /* createRatingProduct: protectedProcedure
    .input(
      z.object({
        comment: z.string().min(5).max(300),
        stars: z.number(),
        productId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { comment, stars, productId } = input;
      const ratingProduct = await ctx.prisma.rating.create({
        data: {
          comment,
          stars,
          userRater: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          product: {
            connect: {
              id: productId,
            },
          },
        },
        include: {
          product: true,
          userRater: true,
        },
      });
    }),
  updateRating: publicProcedure.mutation(async ({ ctx }) => {
    const updateRatingProduct = await ctx.prisma.user.update({
      where: {
        id: "6394a5be1e24d6de9fe2bdee",
      },
      data: {
        rater: {
          update: {
            where: {
              id: "6394bf336c039e7ceaade1e4",
            },
            data: {
              comment: "prueba a comentario",
              stars: 2,
            },
          },
        },
      },
    });
  }),
  deleteRating: protectedProcedure
    .input(z.object({ ratingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deleteRatingProduct = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          rater: {
            delete: {
              id: input.ratingId,
            },
          },
        },
      });
    }),
  getRatingsProduct: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        page: z.number(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const ratingProduct = ctx.prisma.rating.findMany({
        skip: input.page * input.limit - input.limit,
        take: input.limit,
        where: {
          productId: input.productId,
        },
        include: {
          userRater: true,
        },
      });
      return ratingProduct;
    }), */
});
