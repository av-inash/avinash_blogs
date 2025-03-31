
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    blog: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Blog', 
        required: true 
    }, 
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true
         }, 
    text: { 
        type: String,
         required: true 
        },
    likes: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }], 
    replies: [{
         type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
     }], 
  },
  { 
    strict: true,
    collection: "Comment",
    versionKey: false,
    timestamps: true,

  }
);

const CommentModel = mongoose.model('Comment', CommentSchema);
export default CommentModel;
