import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link} from 'react-router-dom';
import {GoogleLogin} from '@react-oauth/google';
import {toast} from 'react-toastify';
import type {RegisterMutation, ValidationError} from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';

interface Props {
    onSubmit: (data: RegisterMutation) => Promise<void>;
    googleLoginHandler: (credentials: string) => Promise<void>;
    error: ValidationError | null;
    isLoading: boolean;
}


const RegisterForm: React.FC<Props> = ({ onSubmit, error, isLoading, googleLoginHandler }) => {
    const {register, handleSubmit, reset, control, formState: {errors} } = useForm<RegisterMutation>({
        defaultValues: {
            username: '',
            password: '',
            displayName: '',
            avatar: null,
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
                  autoComplete="given-name"
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
                <Grid size={12}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  id="displayName"
                  label="Dispay name"
                  autoFocus
                  {...register('displayName', {
                      required: 'Display name is required!',
                      minLength: {
                          value: 3,
                          message: 'Minimum 3 symbols'
                      },
                      setValueAs: (value: string) => value.trim() ?? ''
                  })}
                    error={!!errors.displayName || !!getFieldErrors('displayName')}
                    helperText={errors.displayName?.message || getFieldErrors('displayName')}
                />
              </Grid>
                <Grid size={12}>
                    <Controller
                        name="avatar"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                        <FileInput
                            name={field.name}
                            label="Avatar"
                            onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            field.onChange(file);
                            }}
                        />
                        )}
                    />
                </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              loadingPosition='center'
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

                <Grid sx={{ pt: 2 }}>
                  <GoogleLogin
                      onSuccess={(credentialResponse) => {
                          if (credentialResponse.credential) {
                              googleLoginHandler(credentialResponse.credential);
                          }
                      }}
                      onError={() => toast.error('Login failed')}
                  >
                  </GoogleLogin>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
};

export default RegisterForm;