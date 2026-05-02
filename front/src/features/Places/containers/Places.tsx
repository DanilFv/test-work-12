import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectDeleteLoading,
    selectFetchLoading,
    selectPlaces
} from '../store/places/placesSelectors.ts';
import {useEffect} from 'react';
import {deletePlace, fetchPlaces} from '../store/places/placesThunks.ts';
import PlaceCard from '../components/PlaceCard/PlaceCard.tsx';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import {Typography} from '@mui/material';
import {selectUser} from '../../Users/store/userSelectors.ts';


const Places = () => {
    const dispatch = useAppDispatch();
    const places = useAppSelector(selectPlaces);
    const isLoading = useAppSelector(selectFetchLoading);
    const deleteLoading = useAppSelector(selectDeleteLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchPlaces());
    },[dispatch]);

    const onDeletePlace = async (id: string) => {
        await dispatch(deletePlace(id));
        dispatch(fetchPlaces());
    };

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && places.length === 0 && <Typography variant='h6' component='p'>No cocktails</Typography>}
            {!isLoading && places.length > 0 &&
                <PlaceCard
                    places={places}
                    deleteLoading={deleteLoading}
                    onDelete={onDeletePlace}
                    isAdmin={user?.role === 'admin'}
                />
            }
        </>
    );
};

export default Places;