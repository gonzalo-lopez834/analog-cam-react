import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/UseAuthContext';

export const RutaProtegida = ({ children }) => {
    const { user } = useAuthContext();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};