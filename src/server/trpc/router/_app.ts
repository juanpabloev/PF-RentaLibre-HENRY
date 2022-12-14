import { router } from "../trpc";
import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";
import { ratingRouter } from "./ratingRouter";


export const appRouter = router({
  product: productRouter,
  user: userRouter,
  rating: ratingRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
