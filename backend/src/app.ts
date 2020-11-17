import express, { Request, Response, NextFunction } from 'express';
const app = express();

import mongoose from 'mongoose';

import cors from 'cors';
app.use(cors());
import { json } from 'body-parser';

app.use(json({ limit: '6mb' }));

import { config } from 'dotenv';
config();

let mongo_uri = 'mongodb://127.0.0.1:27017/codezap';
// if (process.env.ENVIRONMENT != 'DEV') {
//     mongo_uri = process.env.MONGODB_URI;
// }

import appRouter from './routes';

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected');
    app.use('/', appRouter);
    // error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(
            'inside error handling middleware\n======================================================================',
        );
        console.log(err);
        if (typeof err == 'string') {
            return res.status(400).send({
                error: {
                    message: err,
                },
            });
        }
        return res.status(400).send({ error: { message: err?.message } });
    });
});

export default app;
