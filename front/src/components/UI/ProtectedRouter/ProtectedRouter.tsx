import {toast} from 'react-toastify';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../../features/Users/store/userSelectors.ts';

interface Props extends React.PropsWithChildren {
    isAllowed: boolean | null;
}

const ProtectedRouter: React.FC<Props> = ({isAllowed, children}) => {
    const user = useAppSelector(selectUser);

    if (user && !isAllowed) {
        toast.warning('You are not allowed to access this page.');
        return  <Navigate to='/'/>;
    }

    if (!isAllowed) {
        toast.warning('You are not allowed to access this page. Please log in.');
        return  <Navigate to='/login'/>;
    }

    return children;
};

export default ProtectedRouter;