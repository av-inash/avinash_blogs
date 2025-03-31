import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



const connectionURI = `mongodb+srv://hydroavinash:avinash123@cluster0.702wjtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

if (!connectionURI) {
  console.error('Failed to connect to MongoDB: Missing database URI');
} else {
  console.log('Connecting to MongoDB with URI:....................');
  mongoose.connect(connectionURI, {})
  .then(() => console.log('...............MongoDB connected successfully...................'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
}

export default mongoose;



