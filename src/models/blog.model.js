
import mongoose from 'mongoose';
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

   
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
            },
        text: { 
            type: String,
             required: true 
            },
        
      }
    ],
    likes: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User' 
        }],
  },
  {  strict: true,
    collection: "Blog",
    versionKey: false,
    timestamps: true
}
);

const BlogModel = mongoose.model('Blog', BlogSchema);
export default BlogModel



