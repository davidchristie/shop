import { z } from "zod";

export const ConfigSchema = z.object({
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().default(4000),
});

export type Config = z.infer<typeof ConfigSchema>;
