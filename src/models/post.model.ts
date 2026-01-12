import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  sender: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [10, 'Content must be at least 10 characters']
    },
    sender: {
      type: String,
      required: [true, 'Sender is required'],
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IPost>('Post', PostSchema);
