import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {CssBaseline} from '@mui/material';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './app/store.ts';
import {Provider} from 'react-redux';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from './constants.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                  <BrowserRouter>
                      <CssBaseline />
                      <App />
                      <ToastContainer />
                  </BrowserRouter>
              </PersistGate>
          </Provider>
      </GoogleOAuthProvider>
  </StrictMode>,
)
