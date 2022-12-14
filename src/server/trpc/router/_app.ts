import { router } from "../trpc";


import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";
import { ratingRouter } from "./ratingRouter";
import { authRouter } from "./auth";

export const appRouter = router({
  product: productRouter,
  user: userRouter,
  rating: ratingRouter,
  auth: authRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
