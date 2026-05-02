import type {IPlace} from '../../../../types';
import {Grid} from '@mui/material';
import PlaceCardItem from './PlaceCardItem/PlaceCardItem.tsx';

interface Props {
    places: IPlace[]
    isAdmin: boolean;
    onDelete: (id: string) => void;
    deleteLoading: boolean;
}

const PlaceCard: React.FC<Props> = ({ places, isAdmin, onDelete, deleteLoading }) => {
    return (
        <>
            <Grid container spacing={2}>
                {places.map(card => (
                    <PlaceCardItem key={card._id} place={card} isAdmin={isAdmin} onDelete={onDelete} deleteLoading={deleteLoading} />
                ))}
            </Grid>
        </>
    );
};

export default PlaceCard;