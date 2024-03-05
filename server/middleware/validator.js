import { z } from 'zod';

const userRegistrationSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .refine((value) => /[a-z]/.test(value), {
            message: 'Password must contain at least one lowercase character',
        })
        .refine((value) => /[A-Z]/.test(value), {
          message: 'Password must contain at least one uppercase character',
        })
        .refine((value) => /\d/.test(value), {
          message: 'Password must contain at least one digit',
        })
        .refine((value) => /[^a-zA-Z0-9]/.test(value), {
          message: 'Password must contain at least one special character',
        }),
});

export default userRegistrationSchema;