import React, { useContext, useEffect } from 'react'
import { protectedRoute, unprotectedRoute } from './axiosInstance';
import { TokenContext } from '../token/TokenContext';
import { isExpired, decodeToken } from "react-jwt";
// import { useNavigate } from 'react-router-dom';

const AxiosRequestInterceptor = ({ children }) => {
    const { accessToken, setAccessToken } = useContext(TokenContext);
    // const navigate = useNavigate();

    useEffect(() => {
        console.log('Refreshed access token: ', accessToken)
    }, [accessToken])

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

        return () => {
            protectedRoute.interceptors.request.eject(requestInterceptor);
        }
    }, [setAccessToken])

    return children
}

export default AxiosRequestInterceptor