import React from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import {useForm} from 'react-hook-form';
import LockOpen from '@mui/icons-material/LockOpen';
import {Link} from 'react-router-dom';
import {GoogleLogin} from '@react-oauth/google';
import {toast} from 'react-toastify';
import type {GlobalError, LoginMutation} from '../../../types';

interface Props {
    onSubmit: (data: LoginMutation) => Promise<void>;
    googleLoginHandler: (credentials: string) => Promise<void>;
    thunkError: GlobalError | null;
    isLoading: boolean;
}

const LoginForm: React.FC<Props> = ({ onSubmit, thunkError, isLoading, googleLoginHandler }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginMutation>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmitHandler = async (data: LoginMutation) => {
        await onSubmit(data);
        reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpen />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>

                {thunkError && <Alert severity='error' sx={{ mt: 3, width: '100%' }}>{thunkError.error}</Alert>}

                <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                {...register('username', { required: 'Username is required!' })}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                {...register('password', { required: 'Password is required!' })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                        <GoogleLogin
                            onSuccess={(res) => res.credential && googleLoginHandler(res.credential)}
                            onError={() => toast.error('Login failed')}
                        />
                    </Box>
                    <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid>
                            <Link to='/register'>Or sign up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;