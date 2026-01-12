import { Request, Response, NextFunction } from 'express';
import Comment from '../models/comment.model';

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { postId } = req.query;
    const filter = postId ? { postId: postId as string } : {};
    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: comments.length, data: comments });
  } catch (error) {
    next(error);
  }
};

export const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found' });
      return;
    }
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found' });
      return;
    }
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
