import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const sayHello = publicProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .output(z.string())
  .query(async ({ input: { name } }) => {
    return `Hello ${name}`;
  });
