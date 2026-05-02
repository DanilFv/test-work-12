import mongoose, {Schema} from 'mongoose';
import {PlaceFields} from '../types';

const PlaceSchema = new Schema<PlaceFields>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    mainImage: {
        type: String,
        required: [true, 'Image is required'],
    }
});

const Place = mongoose.model('Place', PlaceSchema);
export default Place;