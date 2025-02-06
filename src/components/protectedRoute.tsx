import React from 'react';
import { useAtomValue } from 'jotai';

import { userAtom } from '@/atoms/user';
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const user = useAtomValue(userAtom);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;