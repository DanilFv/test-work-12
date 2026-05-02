import {AppBar, Box, Container, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../../app/hooks.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import {selectUser} from '../../../features/Users/store/userSelectors.ts';

const AppToolBar = () => {
    const user = useAppSelector(selectUser);

    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static" sx={{ bgcolor: '#000' }}>
                <Container maxWidth='lg'>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            component={NavLink} to='/'
                            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                        >
                            Cocktails
                        </Typography>

                        {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default AppToolBar;