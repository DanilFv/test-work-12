import {useParams} from 'react-router-dom';
import PlaceDetailsCard
    from '../components/PlaceDetailsCard/PlaceDetailsCard.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectFetchOneLoading,
    selectOnePlace
} from '../store/places/placesSelectors.ts';
import {useEffect} from 'react';
import {fetchOnePlace} from '../store/places/placesThunks.ts';
import {
    addPlaceImage,
    deletePlaceImage,
    fetchGalleryByPlace
} from '../store/gallery/galleryThunks.ts';
import {
    addReview,
    deleteReview,
    fetchReviewsByPlace
} from '../store/reviews/reviewsThunks.ts';
import PlaceGallery from '../components/PlaceGalleryForm/PlaceGalleryForm.tsx';
import {
    selectGalleryDeleteLoading,
    selectGalleryItems,
    selectGalleryUploadLoading
} from '../store/gallery/gallerySelectors.ts';
import {Container} from '@mui/material';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import {
    selectReviewAddError,
    selectReviewAddLoading,
    selectReviewDeleteLoading,
    selectReviews
} from '../store/reviews/reviewsSelectors.ts';
import ReviewCard from '../components/ReviewCard/ReviewCard.tsx';
import ReviewForm from '../components/ReviewForm/ReviewForm.tsx';
import type {ReviewMutation} from '../../../types';
import {selectUser} from '../../Users/store/userSelectors.ts';

const FullPlace = () => {
    const { id } = useParams<{ id: string }>();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const place = useAppSelector(selectOnePlace);
    const gallery = useAppSelector(selectGalleryItems);
    const reviews = useAppSelector(selectReviews);
    const createReviewLoading = useAppSelector(selectReviewAddLoading);
    const createReviewError = useAppSelector(selectReviewAddError);
    const deleteReviewLoading = useAppSelector(selectReviewDeleteLoading);
    const deletePhotoLoading = useAppSelector(selectGalleryDeleteLoading);


    const uploadLoading = useAppSelector(selectGalleryUploadLoading)
    const isLoading = useAppSelector(selectFetchOneLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePlace(id));
            dispatch(fetchGalleryByPlace(id));
            dispatch(fetchReviewsByPlace(id));
        }
    },[dispatch, id]);

    const handlePhotoUpload = async (file: File) => {
        if (id) {
            try {
                await dispatch(addPlaceImage({ placeId: id, image: file })).unwrap();
                dispatch(fetchGalleryByPlace(id));
            } catch (e) {
               console.error(e);
            }
        }
    };

    const onCreateReview = async (data: ReviewMutation) => {
        if (id) {
            try {
                await dispatch(addReview({ data, placeId: id }));
                await dispatch(fetchReviewsByPlace(id));
                dispatch(fetchOnePlace(id));
            } catch (e) {
                console.error(e);
            }
        }
    };

   const onDeletePhoto = async (photoId: string) => {
       await dispatch(deletePlaceImage(photoId));
       if (id) {
           dispatch(fetchGalleryByPlace(id));
       }
   };

    const onDeleteReview = async (reviewId: string) => {
       await dispatch(deleteReview(reviewId));
       if (id) {
           dispatch(fetchReviewsByPlace(id));
       }
   };

    return (
        <>
            {isLoading && <Spinner />}
            <Container maxWidth="lg" sx={{ mt: 4 }}>
            {place && (
                <>
                    <PlaceDetailsCard place={place} />

                    <PlaceGallery
                        images={gallery}
                        onUpload={handlePhotoUpload}
                        isUploading={uploadLoading}
                        deleteLoading={deletePhotoLoading}
                        onDelete={onDeletePhoto}
                        isAdmin={user?.role === 'admin'}
                    />

                    <ReviewCard
                        reviews={reviews}
                        isAdmin={user?.role === 'admin'}
                        onDelete={onDeleteReview}
                        deleteReviewLoading={deleteReviewLoading}
                    />

                    <ReviewForm isLoading={createReviewLoading} serverError={createReviewError} onSubmit={onCreateReview} />
                </>
            )}
        </Container>
        </>
    );
};

export default FullPlace;