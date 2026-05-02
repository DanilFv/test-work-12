import type {IPlace, ValidationError} from '../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createPlace, fetchOnePlace, fetchPlaces} from './placesThunks.ts';

interface PlacesState {
    items: IPlace[];
    onePlace: IPlace | null;
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    createLoading: boolean;
    createError: ValidationError | null;
}

const initialState: PlacesState = {
    items: [],
    onePlace: null,
    fetchLoading: false,
    fetchOneLoading: false,
    createLoading: false,
    createError: null,
}

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchPlaces.pending, (state) => {
           state.fetchLoading = true;
        });
        builder.addCase(fetchPlaces.fulfilled, (state, { payload }) => {
           state.fetchLoading = false;
           state.items = payload;
        });
        builder.addCase(fetchPlaces.rejected, (state) => {
           state.fetchLoading = false;
        });

        builder.addCase(fetchOnePlace.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOnePlace.fulfilled, (state, { payload }) => {
            state.fetchOneLoading = false;
            state.onePlace = payload;
        });
        builder.addCase(fetchOnePlace.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(createPlace.pending, (state) => {
            state.createLoading = true;
            state.createError = null;
        });
        builder.addCase(createPlace.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createPlace.rejected, (state, { payload }) => {
            state.createLoading = false;
            state.createError = payload || null;
        });
    })
});

export const placesReducer = placesSlice.reducer;