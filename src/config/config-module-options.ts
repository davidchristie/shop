import { ConfigModuleOptions } from "@nestjs/config";
import { ConfigSchema } from "./config.schema.js";

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: {
    validate(value: unknown) {
      const result = ConfigSchema.safeParse(value);
      if (result.success) {
        return { value: result.data, error: undefined };
      } else {
        return { value: undefined, error: result.error };
      }
    },
  },
};
