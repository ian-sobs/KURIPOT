import React, { useContext, useEffect } from 'react'
import { protectedRoute } from './axiosInstance';
import { TokenContext } from '../token/TokenContext';

const AxiosRequestInterceptor = ({ children }) => {
    const { accessToken, setAccessToken } = useContext(TokenContext);

    useEffect(() => {
        const requestInterceptor = protectedRoute.interceptors.request.use(function (config) {
            // Do something before request is sent
            return config;
          }, function (error) {
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