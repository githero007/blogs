import { Hono, Context } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from 'common1111111';

export const blogRouter = new Hono<{
    Bindings: { DATABASE_URL: string; SECRET_KEY: string };
    Variables: { userId: string };
}>();

const getPrismaClient = (c: Context) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    return prisma;
};

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        c.status(403);
        return c.json({ error: 'JWT not found' });
    }

    const token = authHeader.replace('Bearer ', ''); // Remove 'Bearer ' if included
    if (!token) {
        c.status(403);
        return c.json({ error: 'Invalid authorization header format' });
    }

    try {
        const user = await verify(token, c.env.SECRET_KEY) as { id: string; name: string };
        if (user) {
            c.set('userId', user.id);
            console.log(user.id);
            await next();
        } else {
            c.status(403);
            return c.json({ error: 'The session has expired or been modified' });
        }
    } catch (error) {
        c.status(403);
        return c.json({ error: 'Invalid or expired token' });
    }
});

blogRouter.post('/postblog', async (c) => {
    const prisma = getPrismaClient(c);
    const body = await c.req.json();
    const authorId = c.get('userId'); // Extract userId from context

    if (!authorId) {
        c.status(403);
        return c.json({ error: 'User not authenticated' });
    }
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "invalid input" });
    }
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                authorId: authorId, // Set the authorId directly
            },
        });

        return c.json({ id: blog.id });
    } catch (error) {
        console.error('Error creating the blog post:', error);
        c.status(500);
        return c.json({ error: 'Error creating the blog post' });
    }
});

blogRouter.put('/postblog', async (c) => {
    const prisma = getPrismaClient(c);
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "invalid input" });
    }
    try {
        const updatedBlog = await prisma.blog.update({
            where: { id: body.id },
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
            },
        });
        c.status(200);
        return c.json({ updatedBlog: updatedBlog });
    } catch (error) {
        console.error('Error updating the blog post:', error);
        c.status(500);
        return c.json({ error: 'Error updating the blog post' });
    }
});

blogRouter.get('/indiviudal/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = getPrismaClient(c);

    try {
        const individualBlog = await prisma.blog.findUnique({ where: { id: id } });
        if (individualBlog) {
            return c.json({ individualBlog: individualBlog });
        } else {
            c.status(404);
            return c.json({ error: 'Blog not found' });
        }
    } catch (error) {
        console.error('Error retrieving the blog post:', error);
        c.status(500);
        return c.json({ error: 'Error retrieving the blog post' });
    }
});

blogRouter.get('/bulk', async (c) => {
    const prisma = getPrismaClient(c);

    try {
        const blogs = await prisma.blog.findMany();
        return c.json({ blogs: blogs });
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        c.status(500);
        return c.json({ error: 'Error retrieving blogs' });
    }
});
