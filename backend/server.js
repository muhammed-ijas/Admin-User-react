import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT;
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/images", express.static(path.resolve(__dirname, "assets/images")));


app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('hello world')
})


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running on ${port} `);
})