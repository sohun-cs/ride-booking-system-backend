import z from "zod";


export const createZodValidationSchema = z.object({

    name: z.string("Name must be string").optional(),
    email: z.string("Email is not valid"),
    password: z.string().min(8)
        .regex(/^.{8,}$/, "Min 8 chars")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, "Must include upper, lower & number")
        .regex(/^(?=.*[@$!%*?&]).*$/, "Must include special char").optional(),

    phone: z.string({ message: "Invalid type" }).regex(
        /^(?:\+88|88)?01[3-9]\d{8}$/,
        "Invalid phone number"
    ).optional()

})


export const updateZodValidationSchema = z.object({

    name: z.string("Name must be string").optional(),
    password: z.string().min(8)
        .regex(/^.{8,}$/, "Min 8 chars")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, "Must include upper, lower & number")
        .regex(/^(?=.*[@$!%*?&]).*$/, "Must include special char").optional(),

    phone: z.string({ message: "Invalid type" }).regex(
        /^(?:\+88|88)?01[3-9]\d{8}$/,
        "Invalid phone number"
    ).optional()

})













