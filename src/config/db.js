import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



const connectionURI = `mongodb://offer`;

if (!connectionURI) {
  console.error('Failed to connect to MongoDB: Missing database URI');
} else {
  console.log('Connecting to MongoDB with URI:', connectionURI);
  mongoose.connect(connectionURI, {})
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
}

export default mongoose;