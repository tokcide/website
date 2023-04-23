import { z } from "zod";
import { publicProcedure, router } from "server/init";

export default router({
  greeting: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input }) => {
      return input.name;
    }),
});
