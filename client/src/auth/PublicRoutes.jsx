import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useToken } from './TokenContext';
import { useEffect, useState } from 'react';

const PublicRoutes = () => {
    const { accessToken, setAccessToken, isAuthenticated, setIsAuthenticated, isFirstLogin } = useToken();
    
    const location = useLocation()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        if(isAuthenticated === true || isAuthenticated === false){
            setLoading(false)
            console.log(`${new Date(Date.now()).toISOString} isAuthenticated === `, isAuthenticated)

        }
        
        //console.log('isAuthenticated === null')
    }, [isAuthenticated])

    if(loading && isAuthenticated === null) {
        return <div>Loading...</div>;
    }
    
    if(isAuthenticated && !isFirstLogin) {
        return <Navigate to='/dashboard' state={{from: location}} replace />
    }
    else if(isFirstLogin){
        navigate('/getting-started', { state: { fromProgrammatically: true } });
    }
    return <Outlet/>
}

export default PublicRoutes