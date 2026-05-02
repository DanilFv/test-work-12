import {createSlice} from '@reduxjs/toolkit';
import type {IReview, ValidationError} from '../../../../types';
import {addReview, deleteReview, fetchReviewsByPlace} from './reviewsThunks.ts';

interface ReviewsState {
    items: IReview[];
    fetchLoading: boolean;
    addLoading: boolean;
    addError: ValidationError | null;
    deleteLoading: boolean;
}

const initialState: ReviewsState = {
    items: [],
    fetchLoading: false,
    addLoading: false,
    addError: null,
    deleteLoading: false,
}

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchReviewsByPlace.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchReviewsByPlace.fulfilled, (state, { payload }) => {
            state.fetchLoading = false;
            state.items = payload;
        });
        builder.addCase(fetchReviewsByPlace.rejected, (state) => {
            state.fetchLoading = false;
        });


        builder.addCase(addReview.pending, (state) => {
            state.addLoading = true;
            state.addError = null;
        });
        builder.addCase(addReview.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(addReview.rejected, (state, { payload }) => {
            state.addLoading = false;
            state.addError = payload || null;
        });


        builder.addCase(deleteReview.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteReview.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteReview.rejected, (state) => {
            state.deleteLoading = false;
        });
    })
});

export const reviewsReducer = reviewsSlice.reducer;
