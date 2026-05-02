import React from 'react';
import {Box, Typography} from '@mui/material';
import type {IReview} from '../../../../types';
import ReviewCardItem from './ReviewCardItem/ReviewCardItem.tsx';

interface Props {
    reviews: IReview[];
    onDelete: (id: string) => void;
    deleteReviewLoading: boolean;
    isAdmin: boolean;
}

const ReviewCard: React.FC<Props> = ({reviews, onDelete, deleteReviewLoading, isAdmin}) => {
    return (
        <Box sx={{mt: 5}}>
            <Typography
                variant="h5"
                sx={{mb: 3, fontWeight: 'bold'}}
            >
                Reviews
            </Typography>

            {reviews.length === 0 ? (
                <Typography
                    color="text.secondary"
                    sx={{fontStyle: 'italic'}}
                >
                    No reviews yet. Be the first to leave one!
                </Typography>
            ) : (
                reviews.map((review) => (
                    <ReviewCardItem
                        key={review._id}
                        review={review}
                        onDelete={onDelete}
                        deleteReviewLoading={deleteReviewLoading}
                        isAdmin={isAdmin}
                    />
                ))
            )}
        </Box>
    );
};

export default ReviewCard;