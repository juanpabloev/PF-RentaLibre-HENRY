import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const ratingRouter = router({
  createRatingUser: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        stars: z.number().min(1).max(5),
        userRatedId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { comment, stars, userRatedId } = input;
      const rating = await ctx.prisma.rating.create({
        data: {
          comment,
          stars,
          userRater: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          userRated: {
            connect: {
              id: userRatedId,
            },
          },
        },
        include: {
          userRated: true,
          userRater: true,
        },
      });
    }),
  createRatingProduct: protectedProcedure
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
  updateRating: protectedProcedure
    .input(
      z.object({
        ratingId: z.string(),
        comment: z.string().min(5).max(300),
        stars: z.number().min(1).max(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { ratingId, comment, stars } = input;
      const updateRatingProduct = await ctx.prisma.rating.update({
        where: {
          id: ratingId,
        },
        data: {
          stars,
          comment,
        },
      });
    }),
  deleteRating: protectedProcedure
    .input(z.object({ ratingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deleteRatingProduct = await ctx.prisma.rating.delete({
        where: {
          id: input.ratingId,
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
    }),
});
