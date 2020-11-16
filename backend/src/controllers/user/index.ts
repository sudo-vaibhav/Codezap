import User from '../../models/User/User';
import { Request, Response, NextFunction } from 'express';
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
        ...req.body,
        ...req.user,
    });

    try {
        await user.save();
        return res.status(200).send(user.toJSON());
    } catch (err) {
        next(err);
    }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({
            _id: req.params._id,
            user_id: req.user.user_id,
        }).exec();
        if (user) {
            return res.status(200).send(user);
        } else {
            next('user not found');
        }
    } catch (err) {
        return next(err);
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    try {
        const result = await User.findOneAndUpdate(
            {
                _id: req.params._id,
                user_id: req.user.user_id,
            },
            { $set: req.body },
            {
                runValidators: true,
                new: false,
            },
        );
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

export default {
    createUser,
    updateUser,
    getUser,
};
