import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users';
import config from './config';
import placeImagesRouter from './routes/placeImages';
import placesRouter from './routes/places';
import reviewsRouter from './routes/reviews';

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use('/users', usersRouter);
app.use('/places', placesRouter);
app.use('/reviews', reviewsRouter);
app.use('/place-images', placeImagesRouter);


const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    process.on('exit', () => {
       mongoose.disconnect();
    });
};

run().catch(err => console.error(err));