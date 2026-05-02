import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import {useForm} from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link} from 'react-router-dom';
import type {RegisterMutation, ValidationError} from '../../../types';

interface Props {
    onSubmit: (data: RegisterMutation) => Promise<void>;
    error: ValidationError | null;
    isLoading: boolean;
}

const RegisterForm: React.FC<Props> = ({ onSubmit, error, isLoading }) => {
    const {register, handleSubmit, reset, formState: {errors} } = useForm<RegisterMutation>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmitHandler = async (data: RegisterMutation) => {
        await onSubmit(data);
        reset();
    };

    const getFieldErrors = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                autoComplete="username"
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                {...register('username', {
                                    required: 'Username is required!',
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum 3 symbols'
                                    },
                                    setValueAs: (value: string) => value.trim() ?? ''
                                })}
                                error={!!errors.username || !!getFieldErrors('username')}
                                helperText={errors.username?.message || getFieldErrors('username')}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                { ...register('password', {
                                    required: 'Password is required!',
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum 3 symbols'
                                    },
                                    setValueAs: (value: string) => value.trim() ?? ''
                                })}
                                error={!!errors.password || !!getFieldErrors('password')}
                                helperText={errors.password?.message || getFieldErrors('password')}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid>
                            <Link to='/login'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;