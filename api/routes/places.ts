import express from 'express';
import Place from '../models/Place';
import Review from '../models/Review';
import auth, {RequestWithUser} from '../middlewares/auth';
import {imagesUpload} from '../middlewares/multer';
import mongoose from 'mongoose';
import permit from '../middlewares/permit';
import PlaceImage from '../models/PlaceImage';

const placesRouter = express.Router();

placesRouter.get('/', async (req, res, next) => {
    try {
        const places = await Place.find().lean();
        const reviews = await Review.find();
        const allImages = await PlaceImage.find();

        const placesWithRatings = places.map(place => {
            const placeReviews = reviews.filter(r => r.place.toString() === place._id.toString());
            const placeImagesCount = allImages.filter(img => img.place.toString() === place._id.toString()).length;

            const totalImages = placeImagesCount + (place.mainImage ? 1 : 0);
            const count = placeReviews.length;

            if (count === 0) {
                return {
                    ...place,
                    overallRating: 0,
                    reviewCount: 0,
                    imageCount: totalImages,
                }
            }

            const avgFood = placeReviews.reduce((sum, r) => sum + r.ratingFood, 0) / count;
            const avgService = placeReviews.reduce((sum, r) => sum + r.ratingService, 0) / count;
            const avgInterior = placeReviews.reduce((sum, r) => sum + r.ratingInterior, 0) / count;

            const overallRating = (avgFood + avgService + avgInterior) / 3;

            return {
                ...place,
                overallRating: Number(overallRating.toFixed(1)),
                reviewCount: count,
                imageCount: totalImages,
            }
        });

        return res.send(placesWithRatings);
    } catch (e) {
        next(e);
    }
});

placesRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id).lean();

        if (!place) {
            return res.status(404).send({ message: 'Place Not Found' });
        }

        const reviews = await Review.find({ place: id }).populate('user', 'username');
        const gallery = await PlaceImage.find({ place: id });
        const count = reviews.length;

        let ratings = {
            overallRating: 0,
            averageFood: 0,
            averageService: 0,
            averageInterior: 0,
        };

        if (count > 0) {
            const avgFood = reviews.reduce((sum, r) => sum + r.ratingFood, 0) / count;
            const avgService = reviews.reduce((sum, r) => sum + r.ratingService, 0) / count;
            const avgInterior = reviews.reduce((sum, r) => sum + r.ratingInterior, 0) / count;

            ratings = {
                averageFood: Number(avgFood.toFixed(1)),
                averageService: Number(avgService.toFixed(1)),
                averageInterior: Number(avgInterior.toFixed(1)),
                overallRating: Number(((avgFood + avgService + avgInterior) / 3).toFixed(1)),
            };
        }

        return res.send({
            ...place,
            ...ratings,
            reviews,
            gallery,
        });
    } catch (e) {
        next(e);
    }
});

placesRouter.post('/',auth, imagesUpload.single('mainImage'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!req.body.agreement) {
            return res.status(400).send({ error: 'Confirm your agreement' });
        }

        const place = new Place({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            mainImage: req.file ? 'images/' + req.file.filename : null,
        });

        await place.save();
        return res.send({
            message: 'Place added successfully',
            place
        });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

placesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id as string;
        const place = await Place.findByIdAndDelete(id);

        if (!place) {
            return res.status(404).send({ message: 'Place Not Found' });
        }

        await Review.deleteMany({ place: id });

        return res.send({ message: 'Place and reviews deleted' });
    } catch (e) {
        next(e);
    }
});

export default placesRouter;