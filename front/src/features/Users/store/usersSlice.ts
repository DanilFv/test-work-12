import type {GlobalError, IUserFields, ValidationError} from '../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {googleLogin, login, logout, register} from './usersThunks.ts';

interface UsersState {
    user: IUserFields | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
    logoutLoading: boolean;
    logoutError: boolean;
}

const initialState: UsersState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
    logoutLoading: false,
    logoutError: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(register.fulfilled, (state, { payload: user }) => {
            state.registerLoading = false;

            if (user) state.user = user;
        });
        builder.addCase(register.rejected, (state, { payload: error }) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });

        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, { payload: user }) => {
            state.loginLoading = false;

            if (user) state.user = user;
        });
        builder.addCase(login.rejected, (state, { payload: error }) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });

        builder.addCase(googleLogin.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
            state.loginLoading = false;

            if (user) state.user = user;
        });
        builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });

         builder.addCase(logout.pending, (state) => {
            state.logoutLoading = true;
            state.logoutError = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loginLoading = false;
            state.user = null;
        });
        builder.addCase(logout.rejected, (state) => {
            state.logoutLoading = false;
            state.logoutError = true;
        });
    }
});

export const usersReducer = usersSlice.reducer;