import {Route, Routes} from 'react-router-dom';
import './App.css';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import {Container, Typography} from '@mui/material';
import Register from './features/Users/containers/Register.tsx';
import Login from './features/Users/containers/Login.tsx';
import Places from './features/Places/containers/Places.tsx';
import NewPlace from './features/Places/containers/NewPlace.tsx';
import ProtectedRouter
    from './components/UI/ProtectedRouter/ProtectedRouter.tsx';
import {useAppSelector} from './app/hooks.ts';
import {selectUser} from './features/Users/store/userSelectors.ts';
import FullPlace from './features/Places/containers/FullPlace.tsx';

const App = () => {
    const user = useAppSelector(selectUser);

  return (
      <>
          <AppToolBar />
          <Container>
              <Routes>
                  <Route path='/register' element={(<Register />)} />
                  <Route path='/login' element={(<Login />)} />

                  <Route path='/' element={(<Places />)} />
                  <Route path='/places/new' element={(
                      <ProtectedRouter isAllowed={!!user}>
                          <NewPlace />
                      </ProtectedRouter>
                      )}
                  />

                  <Route path='/places/:id' element={(
                      <ProtectedRouter isAllowed={!!user}>
                          <FullPlace />
                      </ProtectedRouter>
                      )}
                  />

                  <Route path="*" element={(<Typography variant='h5' component='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>Not Found Page.</Typography>)} />
              </Routes>
          </Container>
      </>
  );
};

export default App
