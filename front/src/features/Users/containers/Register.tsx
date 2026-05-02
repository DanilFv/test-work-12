import type {RegisterMutation} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import {register} from '../store/usersThunks.ts';
import RegisterForm from '../components/RegisterForm.tsx';
import {
    selectRegisterError,
    selectRegisterLoading
} from '../store/userSelectors.ts';


const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectRegisterError);
    const isLoading = useAppSelector(selectRegisterLoading);

    const onSubmitHandler = async (data: RegisterMutation) => {
        try {
           await dispatch(register(data)).unwrap();
           navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={onSubmitHandler} isLoading={isLoading} error={error} />
        </div>
    );
};

export default Register;