import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import type {IPlaceImage, ValidationError} from '../../../../types';
import {isAxiosError} from 'axios';
import {toast} from 'react-toastify';

export const fetchGalleryByPlace = createAsyncThunk<IPlaceImage[], string>(
    'gallery/fetchAllByPlace',
    async (placeId) => {
        const response = await axiosAPI.get<IPlaceImage[]>(`/place-images/${placeId}`);
        return response.data || [];
    }
);

export const addPlaceImage = createAsyncThunk<void, { placeId: string; image: File }, { rejectValue: ValidationError }>(
    'gallery/add',
    async ({ placeId, image }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('place', placeId);
            formData.append('image', image);

            const response = await axiosAPI.post('/place-images', formData);
            toast.success(response.data.message);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const deletePlaceImage = createAsyncThunk<void, string>(
    'gallery/delete',
    async (imageId) => {
        try {
            const response = await axiosAPI.delete(`/place-images/${imageId}`);
            toast.success(response.data.message);
        } catch (e) {
            toast.error('Server error');
            throw e;
        }
    }
);