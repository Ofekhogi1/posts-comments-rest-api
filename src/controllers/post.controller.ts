import { Request, Response, NextFunction } from 'express';
import Post from '../models/post.model';

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sender } = req.query;
    const filter = sender ? { sender: sender as string } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};
