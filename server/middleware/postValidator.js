import { z } from 'zod';

const postValidator = z.object({
    title: z.string().min(5),
    body: z.string().min(5),
});

export default postValidator;