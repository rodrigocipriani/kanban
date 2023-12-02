import { z } from "zod";

export const GetTasksValidation = z.object({
  columnId: z
    .string({
      required_error: "Column ID is required",
      invalid_type_error: "Column ID must be a string",
    })
    .min(1, { message: "Column ID must be at least 1 character long" }),
  authUserId: z
    .string({
      required_error: "Auth User ID is required",
      invalid_type_error: "Auth User  ID must be a string",
    })
    .min(1, { message: "Auth User  ID must be at least 1 character long" }),
});
