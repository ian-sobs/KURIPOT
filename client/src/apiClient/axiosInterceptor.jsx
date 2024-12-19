import React, { useContext, useEffect } from 'react'
import { protectedRoute, unprotectedRoute } from './axiosInstance';
import { TokenContext } from '../auth/TokenContext';
import { isExpired, decodeToken } from "react-jwt";
// import { useNavigate } from 'react-router-dom';

const AxiosRequestInterceptor = ({ children }) => {
    const { accessToken, setAccessToken, isAuthenticated, setIsAuthenticated } = useContext(TokenContext);

    useEffect(() => {
        const requestInterceptor = protectedRoute.interceptors.request.use(
            async function (config) {
                console.log('ProtectedRoute interceptor')
                const myDecodedToken = decodeToken(accessToken);
                const isMyTokenExpired = isExpired(accessToken);

                if(!myDecodedToken || isMyTokenExpired){
                    console.log('Access token is expired')
                    try {
                        const response = await unprotectedRoute.get('/token/refresh')
                        console.log(response);
                        const {data} = response
                        setAccessToken(data.accessToken)
                        config.headers.Authorization = `Bearer ${data.accessToken}`
                    } catch (error) {
                        console.error('Failed to refresh token:', error);
                        // navigate('/signin');
                        return Promise.reject('Token refresh failed, redirecting to login.');
                    }
                } else{
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
                return config;
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            });
        
        console.log("New request interceptor created")

        return () => {
            console.log("Ejected previous request interceptor")
            protectedRoute.interceptors.request.eject(requestInterceptor);
        }
    }, [accessToken])

    return children
}

export default AxiosRequestInterceptor