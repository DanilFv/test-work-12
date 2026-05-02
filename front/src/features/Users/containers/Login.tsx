import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {login} from '../store/usersThunks';
import LoginForm from '../components/LoginForm';
import type {LoginMutation} from '../../../types';
import {selectLoginError, selectLoginLoading} from '../store/userSelectors.ts';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);
    const isLoading = useAppSelector(selectLoginLoading);

    const onSubmitHandler = async (data: LoginMutation) => {
        try {
            await dispatch(login(data)).unwrap();
            navigate('/');
        } catch (e) {
            console.error("Login error:", e);
        }
    };

    return (
        <LoginForm
            onSubmit={onSubmitHandler}
            thunkError={error || null}
            isLoading={isLoading}
        />
    );
};

export default Login;