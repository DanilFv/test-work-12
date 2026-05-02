import {createAsyncThunk} from '@reduxjs/toolkit';
import type {
    GlobalError,
    IUserFields,
    LoginMutation,
    RegisterMutation,
    RegisterResponse,
    ValidationError
} from '../../../types';
import {isAxiosError} from 'axios';
import axiosAPI from '../../../axiosAPI.ts';
import {toast} from 'react-toastify';

export const register = createAsyncThunk<IUserFields, RegisterMutation, { rejectValue: ValidationError }>('/users/register',
    async (data, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('displayName', data.displayName);
        if (data.avatar) formData.append('avatar', data.avatar);

        const response = await axiosAPI.post<RegisterResponse>('/users', formData);
        toast.success(response.data.message);
        return response.data.user;

    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const login = createAsyncThunk<IUserFields, LoginMutation, {rejectValue: GlobalError}>('/users/login',
    async (loginMutation, {rejectWithValue}) => {
    try {
        const response = await axiosAPI.post<RegisterResponse>('/users/session', loginMutation);
        toast.success(response.data.message);
        return response.data.user;
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as GlobalError);
        }
        throw e
    }
});

export const logout = createAsyncThunk<void, void>('/users/logout',
    async () => {
    const response = await axiosAPI.delete<{ message: string }>('/users/session');
    toast.success(response.data.message);
});
