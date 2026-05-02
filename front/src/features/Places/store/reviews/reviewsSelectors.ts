import type {RootState} from '../../../../app/store.ts';

export const selectReviews = (state: RootState) => state.reviews.items;
export const selectReviewsFetchLoading = (state: RootState) => state.reviews.fetchLoading;
export const selectReviewAddLoading = (state: RootState) => state.reviews.addLoading;
export const selectReviewAddError = (state: RootState) => state.reviews.addError;
export const selectReviewDeleteLoading = (state: RootState) => state.reviews.deleteLoading;