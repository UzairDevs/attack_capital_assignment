import { Request, Response } from 'express';
import prisma from '../models';
import { ApiError } from '../utils/apiError';

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    throw new ApiError(400, 'Title and content are required');
  }
  
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId
    }
  });

  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const authorId = req.query.author ? parseInt(req.query.author as string) : undefined;

  const posts = await prisma.post.findMany({
    where: authorId ? { authorId } : undefined,
    include: {
      author: {
        select: {
          id: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.json(posts);
};