import {NextFunction, Request, Response} from 'express';
import {RequestWithUser} from './auth';

const permit = (...roles: string[]) => {
    return (expressReq: Request, res: Response, next: NextFunction) => {
        const { user } = expressReq as RequestWithUser;

        if (!user) {
            return res.status(401).send({error: 'Please authenticate first' });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).send({message: 'Unauthorized'});
        }

        next();
    }
}

export default permit;