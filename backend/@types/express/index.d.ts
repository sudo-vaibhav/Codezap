import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user: {
                user_id?: any;
                email?: string;
                _id?: any;
            };
        }
    }
}
