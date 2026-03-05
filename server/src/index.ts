import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';

// routes
import todoRoutes from './routes/todoRoutes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/todos", todoRoutes)

app.use(errorHandler)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });