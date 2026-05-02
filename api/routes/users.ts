import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import {imagesUpload} from '../middlewares/multer';
import {Error} from 'mongoose';
import config from '../config';
import {OAuth2Client} from 'google-auth-library';

const usersRouter = express.Router();

const createAccessToken = (userId: string) => {
    return jwt.sign({_id: userId}, config.jwtSecret, {expiresIn: '15m'});
};

const createRefreshToken = (userId: string) => {
    return jwt.sign({_id: userId}, config.refreshSecret, {expiresIn: '7d'});
};

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? 'images/' + req.file.filename : null,
        });

        user.token = createRefreshToken(user._id.toString());

        const saveUser = await user.save();

        const accessToken = createAccessToken(saveUser._id.toString());

        res.cookie('refreshToken', saveUser.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

       return res.send({ message: 'Successfully user created', user });
    } catch (e) {
        if (e instanceof Error.ValidationError) {
          return res.status(400).send(e);
        }
        next(e);
    }
});

usersRouter.post('/session', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
           return res.status(400).send({ error: 'User not found' });
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        user.token = createRefreshToken(user._id.toString());
        const userSave = await user.save();

        res.cookie('refreshToken', userSave.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie('accessToken', createAccessToken(userSave._id.toString()), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        return res.send({ message: 'Session created!', user });
    } catch (e) {
        next(e);
    }
});

usersRouter.delete('/session', async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const user = await User.findOne({ token: refreshToken });

            if (user) {
                user.token = '';
                await user.save();
            }
        }

    } catch (e) {
        next(e);
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.send({message: 'Logged out successfully'});
});

usersRouter.post('/token', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).send({ error: 'Refresh token not found' });
        }

        const decoded = jwt.verify(refreshToken, config.refreshSecret) as {_id: string};

        const user = await User.findOne({ _id: decoded._id, token: refreshToken });

        if (!user) {
            return res.status(401).send({ error: 'Invalid refresh token' });
        }

        const newRefreshToken = createRefreshToken(user._id.toString());
        user.token = newRefreshToken;
        await user.save();

        const newAccessToken = createAccessToken(user._id.toString());

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        return res.send({ message: 'Token refreshed' });

    } catch (e) {
       return res.status(401).send({ error: 'Invalid or expired refresh token' });
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        if (!req.body.credential) {
            return res.status(400).send({ error: 'Credential is required' });
        }

        const client = new OAuth2Client(config.googleClientID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.googleClientID,
        });

        const payload = ticket.getPayload();
        if (!payload) return res.status(400).send({ error: 'Google login failed' });

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const avatar = payload.picture || null;

        if (!email) return res.status(400).send({ error: 'Not enough info from Google' });

        let user = await User.findOne({ googleID: id });

        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName: displayName || email,
                avatar: avatar,
            });
        }

        const refreshToken = createRefreshToken(user._id.toString());
        user.token = refreshToken;

        const userSave = await user.save();
        const accessToken = createAccessToken(userSave._id.toString());

        res.cookie('refreshToken', userSave.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        return res.send({ message: 'Google login successful!', user: userSave });
    } catch (e) {
        next(e);
    }
});

export default usersRouter;