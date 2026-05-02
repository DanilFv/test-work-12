import type {PlaceMutation, ValidationError} from '../../../../types';
import {useForm} from 'react-hook-form';
import type {ChangeEvent} from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import FileInput from '../../../../components/UI/FileInput/FileInput.tsx';

interface Props {
    onSubmit: (data: PlaceMutation) => void;
    error: ValidationError | null;
    isLoading: boolean;
}

const PlaceForm: React.FC<Props> = ({ onSubmit, error, isLoading }) => {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<PlaceMutation>({
        defaultValues: {
            title: '',
            description: '',
            mainImage: null,
            agreement: false
        }
    });

    const agreementValue = watch('agreement');

    const onHandleSubmit = (data: PlaceMutation) => {
        onSubmit(data);
        reset();
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setValue('mainImage', file);
    };

    const getServerError = (name: string) => {
       return  error?.errors[name]?.message;
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit(onHandleSubmit)} sx={{ mt: 2 }}>
                <Typography component="h5" variant="h5" sx={{ mb: 5 }}>
                    Add Place
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <TextField
                            label="Title"
                            fullWidth
                            {...register('title', {
                                required: 'Required field',
                                setValueAs: (value: string) => value.trim() ?? '',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum 3 symbols'
                                }
                            })}
                            error={!!errors.title || !!getServerError('title')}
                            helperText={errors.title?.message || getServerError('title')}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            {...register('description', {
                                required: 'Required field',
                                setValueAs: (value: string) => value.trim() ?? '',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum 3 symbols'
                                }
                            })}
                            error={!!errors.description || !!getServerError('title')}
                            helperText={errors.description?.message || getServerError('title')}
                        />
                    </Grid>

                    <Grid size={12}>
                       <Typography variant="subtitle1" gutterBottom component="p" sx={{ fontWeight: '500' }}>Main photo</Typography>
                        <FileInput
                            name='mainImage'
                            label='Choose an image'
                            onChange={onFileChange}
                        />
                        {getServerError('mainImage') && (
                            <FormHelperText error>{getServerError('mainImage')}</FormHelperText>
                        )}
                    </Grid>

                    <Grid size={12}>
                       <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, mb: 1 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                By submitting this form, you agree that the following information will be
                                submitted to the public domain, and administrators of this site will have
                                full control over the said information.
                            </Typography>

                           <FormControlLabel
                               control={
                                    <Checkbox
                                        {...register('agreement', { required: 'You must agree to continue' })}
                                        color="primary"
                                    />
                                }
                                label="I understand"
                           />
                       </Box>
                        {(errors.agreement || getServerError('agreement')) && (
                            <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                                {errors.agreement?.message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid>
                        <Button
                            type='submit'
                            variant="contained"
                            disabled={isLoading || !agreementValue}
                            loading={isLoading}
                            loadingPosition='center'
                            sx={{
                                backgroundColor: '#fff',
                                color: '#000',
                                border: '1px solid #000',
                                padding: '10px 40px',
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                '&:hover': { backgroundColor: '#f5f5f5', borderColor: '#000' }
                            }}
                        >
                            Add place
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PlaceForm;