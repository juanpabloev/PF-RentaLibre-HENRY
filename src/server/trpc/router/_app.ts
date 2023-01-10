import { router } from "../trpc";

import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";
import { ratingRouter } from "./ratingRouter";
import { authRouter } from "./auth";
import { categoryRouter } from "./categoryRouter";
import { notificationRouter } from "./notificationRouter";

export const appRouter = router({
  product: productRouter,
  user: userRouter,
  rating: ratingRouter,
  auth: authRouter,
  category: categoryRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
