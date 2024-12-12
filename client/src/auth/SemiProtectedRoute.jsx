import { Navigate, useLocation } from 'react-router-dom';
import { useToken } from './TokenContext';
import { useEffect, useState } from 'react';

const SemiProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, setIsAuthenticated, isFirstLogin, setIsFirstLogin } = useToken();
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        if(isAuthenticated === true || isAuthenticated === false){
            setLoading(false)
            console.log('isAuthenticated === ', isAuthenticated)
        }
        
        //console.log('isAuthenticated === null')
    }, [isAuthenticated])

  // Check if the state is passed via navigation, this will indicate programmatic navigation
    if (location.state && location.state.fromProgrammatically) {
        return children;
    }

    if(loading && isAuthenticated === null) {
        return <div>Loading...</div>;
    }
  // If accessed programmatically, render the children (the protected route)

    if(!isAuthenticated){
        return  <Navigate to='/signin' state={{from: location}} replace />
    }
    else if(!isFirstLogin){
        return <Navigate to='/dashboard'/>
    }

    return children
};

export default SemiProtectedRoute