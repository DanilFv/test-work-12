import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import {usersReducer} from '../features/Users/store/usersSlice.ts';
import {placesReducer} from '../features/Places/store/places/placesSlice.ts';
import {reviewsReducer} from '../features/Places/store/reviews/reviewsSlice.ts';
import {galleryReducer} from '../features/Places/store/gallery/gallerySlice.ts';

const userPersistConfig = {
    key: 'store: users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    users: persistReducer(userPersistConfig, usersReducer),
    places: placesReducer,
    reviews: reviewsReducer,
    gallery: galleryReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

