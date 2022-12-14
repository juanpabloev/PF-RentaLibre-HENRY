import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const  ratingRouter = router({
createRatingUser: publicProcedure
.input(z.object({comment: z.string(), stars: z.string()}))
.mutation(async ({ctx,input}) => {
  const {comment,stars} = input
  const rating = await ctx.prisma.rating.create({
    data: {
     comment,
     stars,
     userRater: {
      connect: {
       id: '6394da945d08a717b149339b'
      }
     },
     userRated: {
      connect: {
       id: '6394da3d5d08a717b149339a'
      }
     }
    },
    include: {
      userRated: true,
      userRater: true
    }
  })
}),
createRatingProduct: publicProcedure
.input(z.object({comment: z.string(), stars: z.string()}))
.mutation(async ({ctx,input}) => {
  const {comment,stars} = input
 const ratingProduct = await ctx.prisma.rating.create({
    data: {
     comment,
     stars,
     userRater: {
      connect: {
       id: '6394da945d08a717b149339b'
      }
     },
     product: {
      connect: {
       id:'6394daf55d08a717b149339c'
      }
     }
    },
    include: {
      product: true,
      userRater: true,
    }
  })
}),
updateRating: publicProcedure
.mutation(async ({ctx})=> {
    const updateRatingProduct = await ctx.prisma.user.update({
        where: {
            id: '6394a5be1e24d6de9fe2bdee'
        },
        data: {
            rater: {
               update: {
                where: {
                  id: '6394bf336c039e7ceaade1e4'
                },
                data: {
                    comment: 'prueba a comentario',
                    stars: '2'
                }
               }
            }
        }
    })
}),
deleteRating: publicProcedure
.mutation(async ({ctx})=> {
    const deleteRatingProduct = await ctx.prisma.user.update({
        where: {
            id: '6394da945d08a717b149339b'
        },
        data: {
            rater: {
               delete: {
                  id:'639618c6c06f1d7ba549237b'
                }
               }
            }
        })
    })
})
