import {createSlice} from '@reduxjs/toolkit';
import type {IPlaceImage, ValidationError} from '../../../../types';
import {
    addPlaceImage,
    deletePlaceImage,
    fetchGalleryByPlace
} from './galleryThunks.ts';

interface GalleryState {
    items: IPlaceImage[];
    fetchLoading: boolean;
    uploadLoading: boolean;
    uploadError: ValidationError | null;
    deleteLoading: boolean;
}

const initialState: GalleryState = {
    items: [],
    fetchLoading: false,
    uploadLoading: false,
    uploadError: null,
    deleteLoading: false,
};

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: (builder => {

        builder.addCase(fetchGalleryByPlace.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchGalleryByPlace.fulfilled, (state, {payload}) => {
            state.fetchLoading = false;
            state.items = payload;
        });
        builder.addCase(fetchGalleryByPlace.rejected, (state) => {
            state.fetchLoading = false;
        });


        builder.addCase(addPlaceImage.pending, (state) => {
            state.uploadLoading = true;
            state.uploadError = null;
        });
        builder.addCase(addPlaceImage.fulfilled, (state) => {
            state.uploadLoading = false;
        });
        builder.addCase(addPlaceImage.rejected, (state, {payload}) => {
            state.uploadLoading = false;
            state.uploadError = payload || null;
        });


        builder.addCase(deletePlaceImage.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deletePlaceImage.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deletePlaceImage.rejected, (state) => {
            state.deleteLoading = false;
        });
    })
});

export const galleryReducer = gallerySlice.reducer;
