import {Box, Divider, Grid as Grid, Rating, Typography} from '@mui/material';
import {BASE_URL} from '../../../../constants.ts';
import type {IPlaceFull} from '../../../../types';

interface Props {
  place: IPlaceFull;
}

const PlaceDetails: React.FC<Props> = ({ place }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid size={8}>
          <Typography variant="h3" gutterBottom>{place.title}</Typography>
          <Typography variant="body1">{place.description}</Typography>
        </Grid>
        <Grid size={4}>
          <Box
            component="img"
            sx={{ width: '100%', borderRadius: 2, boxShadow: 2 }}
            src={place.mainImage ? BASE_URL + '/' + place.mainImage : '/no-image.png'}
            alt={place.title}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Ratings</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
          <Typography sx={{ minWidth: 150 }}>Overall:</Typography>
          <Rating value={place.overallRating || 0} readOnly precision={0.1} />
          <Typography sx={{ ml: 1 }}>{place.overallRating?.toFixed(1) || '0.0'}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
          <Typography sx={{ minWidth: 150 }}>Quality of food:</Typography>
          <Rating value={place.averageFood || 0} readOnly precision={0.1} />
          <Typography sx={{ ml: 1 }}>{place.averageFood?.toFixed(1) || '0.0'}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
          <Typography sx={{ minWidth: 150 }}>Service quality:</Typography>
          <Rating value={place.averageService || 0} readOnly precision={0.1} />
          <Typography sx={{ ml: 1 }}>{place.averageService?.toFixed(1) || '0.0'}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
          <Typography sx={{ minWidth: 150 }}>Interior:</Typography>
          <Rating value={place.averageInterior || 0} readOnly precision={0.1} />
          <Typography sx={{ ml: 1 }}>{place.averageInterior?.toFixed(1) || '0.0'}</Typography>
        </Box>

      </Box>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};

export default PlaceDetails;