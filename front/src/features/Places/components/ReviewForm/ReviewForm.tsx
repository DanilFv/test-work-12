import React from 'react';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import type {ReviewMutation, ValidationError} from '../../../../types';
import {RATING_FIELDS, RATING_OPTIONS} from '../../../../constants.ts';

interface Props {
    onSubmit: (data: ReviewMutation) => Promise<void>;
    isLoading: boolean;
    serverError: ValidationError | null;
}

const ReviewForm: React.FC<Props> = ({onSubmit, isLoading, serverError}) => {
    const {control, handleSubmit, reset} = useForm<ReviewMutation>({
        defaultValues: {
            comment: '',
            ratingFood: 5,
            ratingService: 5,
            ratingInterior: 5
        }
    });

    const getServerError = (field: keyof ReviewMutation): string | undefined => {
        return serverError?.errors?.[field]?.message;
    };

    const onFormSubmit = async (data: ReviewMutation) => {
        await onSubmit(data);
        if (!serverError) {
            reset();
        }
    };

    return (
        <Paper
            variant="outlined"
            sx={{p: 3, mt: 4, mb: 4}}
        >
            <Typography
                variant="h6"
                gutterBottom
            >
                Add review
            </Typography>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>

                    <Controller
                        name="comment"
                        control={control}
                        rules={{required: 'Comment cannot be empty'}}
                        render={({field, fieldState}) => {
                            const serverMsg = getServerError('comment');

                            return (
                                <TextField
                                    {...field}
                                    label="Your comment"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    error={!!fieldState.error || !!serverMsg}
                                    helperText={fieldState.error?.message || serverMsg}
                                />
                            );
                        }}
                    />

                    <Grid
                        container
                        spacing={2}
                    >
                        {RATING_FIELDS.map((rating) => (
                            <Grid key={rating.name} size={12}>
                                <Controller
                                    name={rating.name}
                                    control={control}
                                    render={({field}) => {
                                        const serverErr = getServerError(rating.name);

                                        return (
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                label={rating.label}
                                                error={!!serverErr}
                                                helperText={serverErr}
                                            >
                                                {RATING_OPTIONS.map((opt) => (
                                                    <MenuItem
                                                        key={opt}
                                                        value={opt}
                                                    >
                                                        {opt}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        );
                                    }}
                                />
                            </Grid>
                        ))}

                        <Grid size={12}>
                            <Button
                                type="submit"
                                loading={isLoading}
                                loadingPosition='center'
                                variant="contained"
                                disabled={isLoading}
                                fullWidth
                                sx={{bgcolor: '#000', height: '56px'}}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Paper>
    );
};

export default ReviewForm;