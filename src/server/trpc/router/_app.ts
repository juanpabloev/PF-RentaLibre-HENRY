import { router } from "../trpc";
import { authRouter } from "./auth";
import { productsRouter } from "./productRouter";

export const appRouter = router({
  products: productsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
