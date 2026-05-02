import React from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Rating,
    Typography
} from '@mui/material';
import type {IPlace} from '../../../../../types';
import {BASE_URL} from '../../../../../constants';
import {Link} from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
  place: IPlace;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  deleteLoading: boolean;
}

const PlaceItem: React.FC<Props> = ({ place, onDelete, isAdmin, deleteLoading }) => {

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(place._id);
    };

    const imagePath = `${BASE_URL}/${place.mainImage}`;

  return (
    <Grid size={4}>
      <Card
          sx={{
              height: '100%',
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
              },
        }}
      >
          {isAdmin && (
            <IconButton
                loading={deleteLoading}
                onClick={handleDelete}
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.8)', color: 'error.main' }
                }}
            >
                <DeleteIcon />
            </IconButton>
        )}
        <CardActionArea component={Link} to={`/places/${place._id}`}>
          <CardMedia
            component="img"
            height="200"
            image={imagePath}
            alt={place.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {place.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating
                value={place.overallRating}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({place.overallRating.toFixed(1)})
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
                {place.reviewCount} {place.reviewCount === 1 ? 'review' : 'reviews'}
            </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto', pt: 1, gap: 0.5 }}>
                  <CameraAltIcon sx={{ fontSize: 20, color: '#000' }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#000' }}>
                      {place.imageCount} photos
                  </Typography>
              </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PlaceItem;