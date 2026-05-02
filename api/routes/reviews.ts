import express from 'express';
import Review from '../models/Review';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middlewares/auth';
import permit from '../middlewares/permit';

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res, next) => {
    try {
        const placeId = req.query.place as string;

        const filter = placeId ? { place: placeId } : {};

        const reviews = await Review.find(filter)
            .populate('user', 'username')
            .sort({ datetime: -1 });

        return res.send(reviews);
    } catch (e) {
        next(e);
    }
});

reviewsRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const { place, comment, ratingFood, ratingService, ratingInterior } = req.body;

        const existingReview = await Review.findOne({ user: user._id, place });

        if (existingReview) {
            return res.status(400).send({ message: 'You have already reviewed this place!' });
        }

        const review = new Review({
            user: user._id,
            place,
            comment,
            ratingFood: Number(ratingFood),
            ratingService: Number(ratingService),
            ratingInterior: Number(ratingInterior),
        });

        await review.save();
        return res.send(review);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

reviewsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id as string;
        const result = await Review.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('No review found!');
        }

        return res.send({ message: 'Review deleted successfully' });
    } catch (e) {
        next(e);
    }
});

export default reviewsRouter;