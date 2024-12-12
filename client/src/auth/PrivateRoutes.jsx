import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { decodeToken, isExpired } from "react-jwt";
import { useToken } from './TokenContext';
import { useEffect, useState } from 'react';
import { unprotectedRoute } from '../apiClient/axiosInstance';

const PrivateRoutes = () => {
    const { accessToken, setAccessToken, isAuthenticated, setIsAuthenticated, isFirstLogin, setIsFirstLogin } = useToken();
    
    const location = useLocation()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true); // Track loading state

    // const [isAuthenticated, setIsAuthenticated] = useState(null)

    // useEffect(()=>{
    //     console.log('about to set isAuth')
    //     const decodedToken = decodeToken(accessToken)
    //     if(decodedToken && !isExpired(accessToken)) {
    //         setIsAuthenticated(true)
    //         console.log('isAuth now true')
    //     }
    //     else{ 
    //         console.log('isAuth still false')
    //         setIsAuthenticated(false)
    //     }
    // }
    // , [accessToken])

    useEffect(() => {
        if(isAuthenticated === true || isAuthenticated === false){
            setLoading(false)
            console.log('isAuthenticated === ', isAuthenticated)
        }
        
        //console.log('isAuthenticated === null')
    }, [isAuthenticated])
    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         try {
    //             const decodedAccToken = decodeToken(accessToken)
    //             const tokenIsExpired = isExpired(accessToken)
    
    //             if(!decodedAccToken || tokenIsExpired){
    //                 throw new Error('Invalid access token')
    //             }
    //             console.log("No need to refresh access token")
    //             setIsAuthenticated(true)
    //         } catch (error) {
    //             try {
    //                 console.log("trying to refresh token")
    //                 const {data} = await unprotectedRoute.post(refreshTokenEndpoint)
    //                 setAccessToken(data.accessToken)
    //                 setIsAuthenticated(true)
    //             } catch (error) {
    //                 console.error('Failed to refresh token', error)
    //                 setIsAuthenticated(false)
    //             }
    //         }
    //     }
    //     checkAuthentication()
    // }, [refreshTokenEndpoint]);
    if(loading && isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if(!isAuthenticated){
        return  <Navigate to='/signin' state={{from: location}} replace />
    }
    else if(isFirstLogin){
        navigate('/getting-started', { state: { fromProgrammatically: true } });
    }
    else{
        return <Outlet/>
    }

    //return (!isAuthenticated) ? <Navigate to='/signin' state={{from: location}} replace /> : <Outlet/>
}

export default PrivateRoutes