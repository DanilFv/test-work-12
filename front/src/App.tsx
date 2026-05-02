import {Route, Routes} from 'react-router-dom';
import './App.css';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import {Container, Typography} from '@mui/material';
import Register from './features/Users/containers/Register.tsx';
import Login from './features/Users/containers/Login.tsx';

const App = () => {

  return (
      <>
          <AppToolBar />
          <Container>
              <Routes>
                  <Route path='/register' element={(<Register />)} />
                  <Route path='/login' element={(<Login />)} />

                  <Route path="*" element={(<Typography variant='h5' component='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>Not Found Page.</Typography>)} />
              </Routes>
          </Container>
      </>
  );
};

export default App
