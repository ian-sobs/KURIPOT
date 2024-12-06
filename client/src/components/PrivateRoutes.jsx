import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { decodeToken, isExpired } from "react-jwt";
import { useToken } from '../token/TokenContext';
import { useEffect, useState } from 'react';
import { unprotectedRoute } from '../apiClient/axiosInstance';

const PrivateRoutes = () => {
    const { accessToken, setAccessToken, loading, setLoading, isAuthenticated, setIsAuthenticated } = useToken();
    const location = useLocation()

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
        setLoading(false)
        console.log('loading now false')
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
    if(loading) {
        return <div>Loading...</div>;
    }
    return (!isAuthenticated) ? <Navigate to='/signin' state={{from: location}} replace /> : <Outlet/>
}

export default PrivateRoutes