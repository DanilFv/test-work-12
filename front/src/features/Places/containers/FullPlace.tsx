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

const FullPlace = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const place = useAppSelector(selectOnePlace);
    const isLoading = useAppSelector(selectFetchOneLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePlace(id));
        }
    },[dispatch, id]);

    return (
        <>
            {place && <PlaceDetailsCard place={place} />}
        </>
    );
};

export default FullPlace;