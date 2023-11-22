import { ConfigModuleOptions } from "@nestjs/config";
import { ConfigSchema } from "./config.schema.js";

export const configModuleOptions: ConfigModuleOptions = {
  validate: (config) => {
    const result = ConfigSchema.safeParse(config);
    if (!result.success) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }
    return result.data;
  },
};
