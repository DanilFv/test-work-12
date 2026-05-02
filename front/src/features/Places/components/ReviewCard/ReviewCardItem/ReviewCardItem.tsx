import React from 'react';
import {Box, Divider, IconButton, Rating, Typography} from '@mui/material';
import dayjs from 'dayjs';
import type {IReview} from '../../../../../types';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    review: IReview;
    isAdmin: boolean;
    onDelete: (id: string) => void;
    deleteReviewLoading: boolean;
}

const ReviewCardItem: React.FC<Props> = ({review, isAdmin, onDelete, deleteReviewLoading}) => {
    return (
        <Box sx={{mb: 4, position: 'relative'}}>
            {isAdmin && (
                <IconButton
                    loading={deleteReviewLoading}
                    onClick={() => onDelete(review._id)}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: 'rgba(0,0,0,0.4)',
                        '&:hover': { color: 'error.main' }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            )}

            <Typography
                variant="body1"
                sx={{mb: 1}}
            >
                On <strong>{dayjs(review.datetime).format('DD.MM.YYYY HH:mm')}</strong>,
                <span
                    style={{
                        color: '#1976d2',
                        cursor: 'pointer',
                        marginLeft: '5px'
                    }}
                >
                    {review.user.username}
                </span> said:
            </Typography>

            <Typography
                variant="body2"
                sx={{mb: 2, fontStyle: 'italic', color: '#555'}}
            >
                "{review.comment}"
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    ml: 2
                }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Typography
                        variant="caption"
                        sx={{minWidth: 100}}
                    >Quality of food:</Typography>
                    <Rating
                        value={review.ratingFood}
                        readOnly
                        size="small"
                    />
                    <Typography
                        variant="caption"
                        sx={{fontWeight: 'bold'}}
                    >{review.ratingFood.toFixed(1)}</Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Typography
                        variant="caption"
                        sx={{minWidth: 100}}
                    >Service quality:</Typography>
                    <Rating
                        value={review.ratingService}
                        readOnly
                        size="small"
                    />
                    <Typography
                        variant="caption"
                        sx={{fontWeight: 'bold'}}
                    >{review.ratingService.toFixed(1)}</Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Typography
                        variant="caption"
                        sx={{minWidth: 100}}
                    >Interior:</Typography>
                    <Rating
                        value={review.ratingInterior}
                        readOnly
                        size="small"
                    />
                    <Typography
                        variant="caption"
                        sx={{fontWeight: 'bold'}}
                    >{review.ratingInterior.toFixed(1)}</Typography>
                </Box>
            </Box>

            <Divider sx={{mt: 3}} />
        </Box>
    );
};

export default ReviewCardItem;