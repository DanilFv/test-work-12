import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {CssBaseline} from '@mui/material';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './app/store.ts';
import {Provider} from 'react-redux';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <CssBaseline />
                    <App />
                    <ToastContainer />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>
);
