import {Box, Button, Menu, MenuItem} from '@mui/material';
import type {IUserFields} from '../../../types';
import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../app/hooks.ts';
import {logout} from '../../../features/Users/store/usersThunks.ts';

interface Props {
    user: IUserFields;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const  [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <Button type='button' component={NavLink} to='/places/new' color='inherit'>
                Add Place
            </Button>

            <Button
                type='button'
                onClick={handleClick}
                color='inherit'
            >
                Hello {user.username}
            </Button>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;