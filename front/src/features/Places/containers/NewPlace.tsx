import PlaceForm from '../components/PlaceForm/PlaceForm.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectCreateError,
    selectCreateLoading
} from '../store/placesSelectors.ts';
import type {PlaceMutation} from '../../../types';
import {createPlace} from '../store/placesThunks.ts';
import {useNavigate} from 'react-router-dom';


const NewPlace = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectCreateError);
    const isLoading = useAppSelector(selectCreateLoading);
    const navigate = useNavigate();

    const onCreatePlace = async (data: PlaceMutation) => {
        await dispatch(createPlace(data));
        navigate('/');
    };

    return (
        <>
            <PlaceForm onSubmit={onCreatePlace} error={error} isLoading={isLoading} />
        </>
    );
};

export default NewPlace;