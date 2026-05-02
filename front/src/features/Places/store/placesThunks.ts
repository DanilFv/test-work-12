import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';
import type {IPlace, PlaceMutation, ValidationError} from '../../../types';
import {isAxiosError} from 'axios';
import {toast} from 'react-toastify';

export const fetchPlaces = createAsyncThunk<IPlace[], void>('places/fetchAll',
    async () => {
    const response = await axiosAPI.get<IPlace[]>('/places');
    return response.data || [];
});

export const fetchOnePlace = createAsyncThunk<IPlace, string>('places/fetchOnePlace',
    async (id) => {
    const response = await axiosAPI.get<IPlace>(`/places/${id}`);
    return response.data;
});

export const createPlace = createAsyncThunk<void, PlaceMutation, { rejectValue: ValidationError }>('/places/createPlace',
    async (data, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('agreement', data.agreement ? 'true' : '');

        if (data.mainImage) {
            formData.append('mainImage', data.mainImage);
        }

        const response =  await axiosAPI.post('/places', formData);
        toast.success(response.data.message);

    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as ValidationError);
        }
        throw e;
    }
});

export const deletePlace = createAsyncThunk<void, string>(
    'places/delete',
    async (id) => {
        const response = await axiosAPI.delete(`/places/${id}`);
        toast.success(response.data.message);
    }
);