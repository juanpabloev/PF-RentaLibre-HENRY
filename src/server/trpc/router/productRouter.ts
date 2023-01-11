import { title } from "process";
import { MdDescription } from "react-icons/md";
import { string, z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const productRouter = router({
  getProducts: publicProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number().min(1).max(100).default(10),
        order: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, order } = input;
      let orderByInp;
      switch (order) {
        case "Menor precio":
          orderByInp = "asc";
          break;
        case "Mayor precio":
          orderByInp = "desc";
          break;
        default:
          orderByInp = null;
          break;
      }

      const products = await ctx.prisma.product.findMany({
        skip: page * limit - limit,
        take: limit,
        where: {
          disabled: false,
        },
        orderBy: order
          ? orderByInp
            ? ({
                price: orderByInp,
              } as any)
            : {
                favorito: {
                  _count: "desc",
                },
              }
          : undefined,

        include: {
          rating: true,
          category: true,
          user: true,
        },
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
        include: {
          rating: true,
          category: true,
          user: true,
        },
      });

      return productById;
    }),
  getProductByTitle: publicProcedure
    .input(
      z.object({
        title: z.string(),
        page: z.number(),
        limit: z.number().min(1).max(100).default(10),
        order: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {

      const { title, page, limit, order } = input;
      let orderByInp;
      switch (order) {
        case "Menor precio":
          orderByInp = "asc";
          break;
        case "Mayor precio":
          orderByInp = "desc";
          break;
        default:
          orderByInp = null;
          break;
      }
      const productByTitle = await ctx.prisma.product.findMany({
        skip: page * limit - limit,
        take: limit,
        include: {
          rating: true,
          category: true,
          user: true,
        },
        where: {
          disabled: false,
          OR: [
          {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: title,
              mode: "insensitive",
            },
          },
        ],
        },
        orderBy: order
          ? orderByInp
            ? ({
                price: orderByInp,
              } as any)
            : {
                favorito: {
                  _count: "desc",
                },
              }
          : undefined,
      });
      return productByTitle;
    }),
  getProductByTitleAndCategory: publicProcedure
    .input(
      z.object({
        title: z.string(),
        categoryName: z.string(),
        page: z.number(),
        limit: z.number().min(1).max(100).default(10),
        order: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { title, categoryName, page, limit, order } = input;
      let orderByInp;
      switch (order) {
        case "Menor precio":
          orderByInp = "asc";
          break;
        case "Mayor precio":
          orderByInp = "desc";
          break;
        default:
          orderByInp = null;
          break;
      }

      const category = await ctx.prisma.category.findFirst({
        where: { name: categoryName },
      });
      const categoryId = category?.id;

      const productsByTittleAndCategory = await ctx.prisma.product.findMany({
        skip: page * limit - limit,
        take: limit,
        include: {
          rating: true,
          category: true,
          user: true,
        },
        where: {
          disabled: false,
          categoryId,
          title: {
            contains: title,
            mode: "insensitive",
          },
        },
        orderBy: order
          ? orderByInp
            ? ({
                price: orderByInp,
              } as any)
            : {
                favorito: {
                  _count: "desc",
                },
              }
          : undefined,
      });

      return productsByTittleAndCategory;
    }),
  getProductByCategory: publicProcedure
    .input(
      z.object({
        categoryName: z.string(),
        title: z.string().default(" "),
        page: z.number(),
        limit: z.number().min(1).max(100).default(10),
        order: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { categoryName, page, limit, order } = input;
      let orderByInp;
      switch (order) {
        case "Menor precio":
          orderByInp = "asc";
          break;
        case "Mayor precio":
          orderByInp = "desc";
          break;
        default:
          orderByInp = null;
          break;
      }
      const category = await ctx.prisma.category.findFirst({
        where: { name: categoryName },
      });
      const categoryId = category?.id;
      let productByCategory;
      console.log(title);
      if (title == " ") {
        productByCategory = await ctx.prisma.product.findMany({
          skip: page * limit - limit,
          take: limit,
          include: {
            rating: true,
            category: true,
            user: true,
          },
          where: {
            disabled: false,
            categoryId,
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          orderBy: order
            ? orderByInp
              ? ({
                  price: orderByInp,
                } as any)
              : {
                  favorito: {
                    _count: "desc",
                  },
                }
            : undefined,
        });
      } else {
        productByCategory = await ctx.prisma.product.findMany({
          skip: page * limit - limit,
          take: limit,
          include: {
            rating: true,
            category: true,
            user: true,
          },
          where: {
            disabled: false,
            categoryId,
          },
          orderBy: order
            ? orderByInp
              ? ({
                  price: orderByInp,
                } as any)
              : {
                  favorito: {
                    _count: "desc",
                  },
                }
            : undefined,
        });
      }

      return productByCategory;
    }),
  createProducts: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        price: z.number(),
        securityDeposit: z.number(),
        categoryId: z.any(),
        description: z.string(),
        brand: z.string(),
        model: z.string(),
        pictures: z.array(string()),
        availability: z.object({
          available: z.boolean(),
          dateAvailable: z.array(z.string(), z.string()),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        brand,
        model,
        pictures,
        securityDeposit,
        price,
        categoryId,
        description,
        availability,
      } = input;
      const product = await ctx.prisma.product.create({
        data: {
          title,
          price,
          description,
          brand,
          model,
          pictures,
          securityDeposit,
          category: { connect: { id: categoryId } },
          availability,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          paymentMethod: {
            connect: {
              paymentName: "Mercado Pago",
            },
          },
        },
        include: {
          category: true,
          user: true,
        },
      });
    }),

   deleteProduct: publicProcedure
  .input(z.object({productId: z.string(),deleted: z.boolean()}))
  .mutation(async ({ ctx,input}) => {
    const {productId,deleted} = input;
    const deleteProduct = await ctx.prisma.product.update({
       where: {
        id: productId,
       },
      data: {
        deleted
      },
    });
    return deleteProduct
  }),
  updateProduct: publicProcedure
  .input(z.object({
    title:z.string().optional(),
    categoryId:z.string().optional(),
    model:z.string().optional(),
    brand:z.string().optional(),
    price:z.number().optional(),
    securityDeposit:z.number().optional(),
    description:z.string().optional(),
    productId: z.string(),
    pictures: z.array(z.string()).optional()
  }))
  .mutation(async ({ ctx,input}) => {
   const {pictures,title,categoryId,model,brand,price,securityDeposit,description,productId} = input
    const updateProduct = await ctx.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
          title,
        category: {
         connect: {
          id: categoryId
         }
      },
      model,brand,price,securityDeposit,description,pictures
    }
   })
   return updateProduct
  }),
  disableProduct: publicProcedure
    .input(
      z.object({
        disabled: z.boolean(),
        productId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { disabled, productId } = input;
      const disabledProduct = await ctx.prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          disabled,
        },
      });
      return disabledProduct;
    }),
});
