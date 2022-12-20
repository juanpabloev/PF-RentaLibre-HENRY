import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const categoryRouter = router({
  getCategories: publicProcedure
    .input(
      z
        .object({
          id: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx }) => {
      const categories = await ctx.prisma.category.findMany();
      return categories;
    }),
});
