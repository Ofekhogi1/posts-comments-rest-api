import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post ID is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [1, 'Content cannot be empty']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IComment>('Comment', CommentSchema);
