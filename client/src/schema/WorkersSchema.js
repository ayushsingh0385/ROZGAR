import { z } from "zod";

export const WorkersFromSchema = z.object({
  WorkersName: z.string().nonempty({ message: "Workers name is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  contactNo: z.string().regex(/^[0-9]{10}$/, { message: "Contact number must be exactly 10 digits" }),
  cuisines: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});
