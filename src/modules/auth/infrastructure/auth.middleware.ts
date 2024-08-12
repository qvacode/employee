import { Request, Response, NextFunction } from 'express';
import { Utility } from '../../../common/utility';
import { UserPrimitiveData, UserRole } from '../../users/domain/user.entity';
import { userUseCases } from '../../users/infrastructure/dependencies-injection';

export interface AuthRequest extends Request {
    user?: UserPrimitiveData
}

export function authorizeRoles(allowedRoles: UserRole[]) {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = Utility.validateToken(token);
            const tokenValues = (decodedToken as { id: string, role: UserRole });

            if (!allowedRoles.includes(tokenValues.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
            }
            
            const user = await userUseCases.findById(tokenValues.id)
            req.user = user;

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
}

export const onlyAdmin = () => authorizeRoles([UserRole.ADMIN])
export const onlyManager = () => authorizeRoles([UserRole.MANAGER])
export const adminAndManager = () => authorizeRoles([UserRole.ADMIN, UserRole.MANAGER])
