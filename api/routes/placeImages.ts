import {Router} from 'express';
import PlaceImage from '../models/PlaceImage';
import {imagesUpload} from '../middlewares/multer';
import auth, {RequestWithUser} from '../middlewares/auth';
import mongoose from 'mongoose';
import permit from '../middlewares/permit';

const placeImagesRouter = Router();

placeImagesRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id as string;
        const images = await PlaceImage.find({ place: id });

        return res.send(images);
    } catch (e) {
        next(e);
    }
});

placeImagesRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!req.body.place) {
            return res.status(400).send({ message: 'Place is required' });
        }

        const placeImage = new PlaceImage({
            user: user._id,
            place: req.body.place,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await placeImage.save();
        return res.send(placeImage);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

placeImagesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id as string;
        const result = await PlaceImage.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: 'Image not found' });
        }

        return res.send({ message: 'Image deleted successfully' });
    } catch (e) {
        next(e);
    }
});

export default placeImagesRouter;