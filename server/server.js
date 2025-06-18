import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import sosRoutes from './routes/sosRoutes.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);


app.get('/', (req, res) => {
  res.send('Puppy House API Running 🐶');
});

const PORT = process.env.PORT || 5000;

 mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(err => console.log(err));



