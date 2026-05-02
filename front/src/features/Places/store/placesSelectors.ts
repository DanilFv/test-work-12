import type {RootState} from '../../../app/store.ts';

export const selectPlaces = (state: RootState) => state.places.items;
export const selectFetchLoading = (state: RootState) => state.places.fetchLoading;

export const selectOnePlace = (state: RootState) => state.places.onePlace;
export const selectFetchOneLoading = (state: RootState) => state.places.fetchOneLoading;

export const selectCreateLoading = (state: RootState) => state.places.createLoading;
export const selectCreateError = (state: RootState) => state.places.createError;