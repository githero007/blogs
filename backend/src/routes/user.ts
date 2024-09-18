import { Hono, Context } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { z } from "zod";
import { signUpInput, signInInput } from 'common1111111';
export const userRouter = new Hono<
    {
        Bindings: { DATABASE_URL: string, SECRET_KEY: string }
    }
>()
const getPrismaClient = (c: Context) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    return prisma;
}

userRouter.post('/signup', async (c) => {
    const prisma = getPrismaClient(c);
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if (!success) { // Check if the input is valid          
        c.status(411);
        return c.json({ error: "invalid input" });
    }

    const { email, password, name }: { email: string, password: string, name: string } = body;
    const alreadyExists = await prisma.user.findUnique({ where: { email: email } });
    if (alreadyExists) {
        c.status(403);
        return c.json({ error: "user already exists" });
    }
    const user = await prisma.user.create({ data: { name: name, email: email, password: password } });
    const payload = {
        id: user.id,
        name: user.name,
    }
    const token = await sign(payload, c.env.SECRET_KEY);
    return c.json({ token: token })
});
userRouter.post('/login', async (c) => {
    const prisma = getPrismaClient(c);
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "invalid input" });
    }
    const { email, password } = body;
    const user = await prisma.user.findUnique({ where: { email: email } }); //findUnique function returns a promise
    if (!user) {
        c.status(404);
        return c.json({ error: "user not found" });
    }
    if (user && user.password !== password) {
        c.status(403);
        return c.json({ error: "password not match" });
    }
    const payload = {
        id: user.id,           // Include the user ID
        name: user.name,       // Include the user's name
    }
    const token = await sign(payload, c.env.SECRET_KEY);
    return c.json({ token: token })
});