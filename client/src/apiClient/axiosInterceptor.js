import React, { useContext, useEffect, useCallback } from 'react'
import { protectedRoute, unprotectedRoute } from './axiosInstance';
import { TokenContext } from '../token/TokenContext';
import { useNavigate } from 'react-router-dom';
import { useJwt } from "react-jwt";

const AxiosRequestInterceptor = ({ children }) => {
    const { accessToken, setAccessToken } = useContext(TokenContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Refreshed access token: ', accessToken)
    }, [accessToken]);

    const requestInterceptor = useCallback((config) => {
        const { decodedToken, isExpired } = useJwt(accessToken);

        console.log('ProtectedRoute interceptor');

        if (!decodedToken || isExpired) {
            console.log('Access token is expired');
            
            return unprotectedRoute.get('/token/refresh')
                .then(function (response) {
                    // Handle success
                    console.log('Token refreshed successfully:', response);
                    const { data } = response;
                    setAccessToken(data.accessToken);  // Update state with new access token

                    // Return the updated config with new access token in headers
                    config.headers.Authorization = `Bearer ${data.accessToken}`;
                    return config;
                })
                .catch(function (error) {
                    console.error('Failed to refresh token:', error);

                    // Redirect to login page and reject request
                    navigate('/signin');
                    return Promise.reject('Token refresh failed, redirecting to login.');
                });
        } else {
            // If the token is valid and not expired, attach it to the request headers
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        }
    }, [accessToken, navigate, setAccessToken]);

    useEffect(() => {
        const interceptor = protectedRoute.interceptors.request.use(requestInterceptor, function (error) {
            return Promise.reject(error);
        });

        return () => {
            protectedRoute.interceptors.request.eject(interceptor);
        }
    }, [requestInterceptor]);

    return children;
};

export default AxiosRequestInterceptor;
