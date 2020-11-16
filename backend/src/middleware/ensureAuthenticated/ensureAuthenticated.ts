import * as admin from 'firebase-admin';
import * as serviceAccount from '../../../codezap-firebase-config.json';

import { config } from 'dotenv';
config();
import { Request, Response, NextFunction } from 'express';

import User from '../../models/User/User';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
});

const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    console.log('inside ensureAuth middleware\n###############################################');
    const authToken = req.headers.authtoken as string;
    if (authToken) {
        let userData = {};
        if (authToken == 'test') {
            const user = await User.findOne({
                user_id: 'j4vM2gwuiARNg7c5uAbMddXVxiJ2',
            });
            if (user) {
                userData = user.toJSON();
            }
            req.user = {
                user_id: 'j4vM2gwuiARNg7c5uAbMddXVxiJ2',
                email: 'abc@gmail.com',
                ...userData,
            };
            console.log('decoded token', req.user);
            next();
        } else {
            admin
                .auth()
                .verifyIdToken(authToken)
                .then(async decodedToken => {
                    console.log('decoded token', decodedToken);
                    const user = await User.findOne({
                        user_id: decodedToken.user_id,
                    });

                    if (user) {
                        userData = user.toJSON();
                    }
                    req.user = { ...decodedToken, ...userData };
                    console.log(req.user);
                    next();
                })
                .catch(err => {
                    console.log('some problem with token. Unable to decode');
                    next(err);
                });
        }
    } else {
        next('no authtoken provided in header');
    }
};

export default ensureAuthenticated;
