import mongoose, {Schema} from 'mongoose';
import {PlaceImageFields} from '../types';

const PlaceImageSchema = new Schema<PlaceImageFields>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const PlaceImage = mongoose.model('PlaceImage', PlaceImageSchema);
export default PlaceImage;