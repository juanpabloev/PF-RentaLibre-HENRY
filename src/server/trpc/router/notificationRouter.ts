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
      const notifications:any = ctx.prisma.user.findMany({
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
    })
  })