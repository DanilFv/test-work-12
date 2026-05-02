import React from 'react';
import {
    Box,
    Button,
    IconButton,
    ImageList,
    ImageListItem,
    Paper,
    Typography
} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import {BASE_URL} from '../../../../constants';
import type {IPlaceImage} from '../../../../types';
import FileInput from '../../../../components/UI/FileInput/FileInput.tsx';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    images: IPlaceImage[];
    onUpload: (file: File) => Promise<void>;
    isUploading: boolean;
    onDelete: (id: string) => void;
    isAdmin: boolean;
    deleteLoading: boolean;
}

const PlaceGalleryForm: React.FC<Props> = ({images, onUpload, isUploading, onDelete, isAdmin, deleteLoading}) => {
    const {control, handleSubmit, reset, watch} = useForm<{
        image: File | null
    }>({
        defaultValues: {image: null}
    });

    const selectedFile = watch('image');

    const onSubmit = async (data: { image: File | null }) => {
        if (data.image) {
            await onUpload(data.image);
            reset();
        }
    };

    return (
        <Box sx={{mt: 5, mb: 5}}>
            <Typography
                variant="h5"
                sx={{mb: 2, fontWeight: 'bold'}}
            >
                Gallery
            </Typography>

            {images.length > 0 ? (
                <ImageList
                    sx={{width: '100%', mb: 4}}
                    cols={6}
                    rowHeight={160}
                    gap={8}
                >
                    {images.map((item) => (
                        <ImageListItem
                            key={item._id}
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transition: 'transform 0.2s',
                                position: 'relative',
                                '&:hover': {transform: 'scale(1.02)'},
                                '& .delete-icon': { opacity: 1 }
                            }}
                        >
                            {isAdmin && (
                                <IconButton
                                    loading={deleteLoading}
                                    className="delete-icon"
                                    onClick={() => onDelete(item._id)}
                                    sx={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        zIndex: 2,
                                        opacity: 0,
                                        transition: 'opacity 0.2s',
                                        backgroundColor: 'rgba(255,255,255,0.6)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            color: 'error.main'
                                        }
                                    }}
                                    size="small"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}

                            <img
                                src={`${BASE_URL}/${item.image}`}
                                alt="Place"
                                loading="lazy"
                                style={{height: '100%', objectFit: 'cover'}}
                            />

                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <Typography
                    sx={{
                        mb: 3,
                        color: 'text.secondary',
                        fontStyle: 'italic'
                    }}
                >
                    No photos yet. Be the first to upload one!
                </Typography>
            )}

            <Paper
                variant="outlined"
                sx={{p: 3, bgcolor: '#f9f9f9'}}
            >
                <Typography
                    variant="subtitle1"
                    sx={{mb: 2}}
                >
                    Add new photo
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Controller
                            name="image"
                            control={control}
                            rules={{required: 'Required field'}}
                            render={({field}) => (
                                <FileInput
                                    label="Select Image"
                                    name={field.name}
                                    onChange={(e) => {
                                        const file = e.target.files ? e.target.files[0] : null;
                                        field.onChange(file);
                                    }}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            loading={isUploading}
                            loadingPosition="center"
                            disabled={isUploading || !selectedFile}
                            sx={{
                                alignSelf: 'flex-start',
                                bgcolor: '#000',
                                '&:hover': {bgcolor: '#333'}
                            }}
                        >
                            Upload Photo
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default PlaceGalleryForm;