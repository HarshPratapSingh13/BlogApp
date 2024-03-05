import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(8)
    .max(30)
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
    });

export default passwordSchema;