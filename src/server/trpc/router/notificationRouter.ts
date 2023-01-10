import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const notificationRouter = router({
  createNotification: publicProcedure
  .input(
    z.object({
      type: z.string(),
      message: z.string(),
      productId: z.string(),
      id: z.string(),
      productName: z.string(),
      productImage: z.string()
    })
  )
    .mutation(async ({ input, ctx }:any) => {
      const { type, message, productId, id } = input;
      const notification = await ctx.prisma.notification.create({
        data: {
          notificationType: {
            id: 1,
            message: message,
            type: type,
            productId: productId,
            productName: input.productName,
            productImage: input.productImage
          },
          user: {
            connect: {
              id: id
            }
          },
          userAction: {
            connect: {
              id: ctx.session.user.id
            }
          }
        },
        include: {
          user: true,
          userAction: true,
    }});
    return notification;
  }),
  getNotification: publicProcedure
    .input(
      z.object({
        userId: z.any()
      })
    )
    .query(async ({ ctx, input }) => {
      const notifications = ctx.prisma.user.findMany({
        where:{
          id: input.userId
        },
        include: {
          user:{
            include:{
              userAction:true
          }},
          userAction:{
            include:{
              user:true
          }
        },
      }});
      return notifications;
    }),
    readNotification: publicProcedure
    .input(
      z.object({
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
      const notification = await ctx.prisma.notification.update({
        where: {
          id: input.id
        },
        data: {
          read: true
        }
      })
      return notification
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
