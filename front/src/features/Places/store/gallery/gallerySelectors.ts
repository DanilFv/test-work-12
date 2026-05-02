import type {RootState} from '../../../../app/store.ts';

export const selectGalleryItems = (state: RootState) => state.gallery.items;
export const selectGalleryFetchLoading = (state: RootState) => state.gallery.fetchLoading;
export const selectGalleryUploadLoading = (state: RootState) => state.gallery.uploadLoading;
export const selectGalleryUploadError = (state: RootState) => state.gallery.uploadError;
export const selectGalleryDeleteLoading = (state: RootState) => state.gallery.deleteLoading;