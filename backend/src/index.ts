import { Hono, Context } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { env } from 'hono/adapter'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<
  {
    Bindings: { DATABASE_URL: string, SECRET_KEY: string }
  }
>()
const getPrismaClient = (c: Context) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  return prisma;
}
app.use('*', cors({
  origin: '*', // Allow all origins
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);



export default app
