import {createAsyncThunk} from '@reduxjs/toolkit';
import type {IReview, ReviewMutation, ValidationError} from '../../../../types';
import {isAxiosError} from 'axios';
import axiosAPI from '../../../../axiosAPI.ts';
import {toast} from 'react-toastify';

export const addReview = createAsyncThunk<void, { placeId: string, data: ReviewMutation }, { rejectValue: ValidationError | string }>('reviews/addReview',
    async ({ placeId, data }, { rejectWithValue }) => {
    try {
        await axiosAPI.post('/reviews', {...data, place: placeId});
    } catch (e) {
       if (isAxiosError(e) && e.response) {

           if (e.response.data && e.response.data.message) {
               toast.error(e.response.data.message);
               return rejectWithValue(e.response.data.message);
           }

           if (e.response.status === 400) {
               return rejectWithValue(e.response.data as ValidationError);
           }

       }
    }
});

export const fetchReviewsByPlace = createAsyncThunk<IReview[], string>(
    'reviews/fetchAllByPlace',
    async (placeId) => {
        const response = await axiosAPI.get<IReview[]>(`/reviews?place=${placeId}`);
        return response.data;
    }
);

export const deleteReview = createAsyncThunk<void, string>('reviews/deleteReview',
    async (id) => {
    const response = await axiosAPI.delete(`/reviews/${id}`);
    toast.success(response.data.message);
});