import mongoose, {Schema} from 'mongoose';
import {ReviewFields} from '../types';

const ReviewSchema = new Schema<ReviewFields>({
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
    comment: {
        type: String,
        required: true,
    },
    ratingFood: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
     ratingService: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    ratingInterior: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    datetime: {
        type: Date,
        default: Date.now,
    }
});

const Review = mongoose.model<ReviewFields>('Review', ReviewSchema);
export default Review;