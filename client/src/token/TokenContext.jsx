// TokenContext.js
import React, { createContext, useContext, useState, useEffect, useRef, } from 'react';
import { isExpired, decodeToken } from 'react-jwt';
import { unprotectedRoute } from '../apiClient/axiosInstance';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    // const [actualAccTok, setActualAccTok] = useState(null);
    const refreshTimeout = useRef(null); // Ref to store the timeout ID

    const decodedToken = decodeToken(accessToken);

    if (!decodedToken) {
        unprotectedRoute.post('/token/refresh')
            .then(function(response){
                const {data} = response
                setAccessToken(data.accessToken)
                console.log('access token has invalid structure. access token refreshed')
            })
            .catch(function(error){
                console.error('No access token: ', error)
                setIsAuthenticated(false)
            })
    }

    // useEffect(() => {
    //     const scheduleTokenRefresh = () => {
    //         if (refreshTimeout.current) {
    //             clearTimeout(refreshTimeout.current); // Clear the previous timer
    //         }

    //         try {
    //             const decodedToken = decodeToken(accessToken);

    //             if (!decodedToken) {
    //                 unprotectedRoute.post('/token/refresh')
    //                     .then(function(response){
    //                         const {data} = response
    //                         setAccessToken(data.accessToken)
    //                         console.log('access token has invalid structure. access token refreshed')
    //                     })
    //                     .catch(function(error){
    //                         console.error('No access token: ', error)
    //                     })
    //                 return
    //             }

    //             const expirationTime = decodedToken.exp * 1000; // Convert to ms
    //             const currentTime = Date.now();
    //             const timeToRefresh = expirationTime - currentTime - 5 * 60 * 1000; // Refresh 5 minutes before expiry

    //             if (timeToRefresh > 0) {
    //                 // setLoading(false)
    //                 refreshTimeout.current = setTimeout(async () => {
    //                     try {
    //                         const {data, status} = await unprotectedRoute.post('/token/refresh')

    //                         if (!status === 200) throw new Error("Failed to refresh token");
    //                         console.log('Access token refreshed')
    //                         setAccessToken(data.accessToken); // Update token in state
    //                     } catch (error) {
    //                         console.error("Failed to refresh token:", error);
    //                         setAccessToken(null)
    //                     }
    //                 }, timeToRefresh);
    //                 console.log('refresh timeout set')
    //             }
    //         } catch (error) {
    //             console.error("Failed to decode token:", error);
    //         } finally {
    //             setLoading(false); // Always stop loading after processing
    //         }
    //     };

    //     scheduleTokenRefresh();

    //     return () => {
    //         if (refreshTimeout.current) {
    //             clearTimeout(refreshTimeout.current); // Clear the timer on unmount
    //         }
    //     };
    // }, [accessToken]); // Re-run when the token changes

    useEffect(() => {
        const scheduleTokenRefresh = () => {
            //setLoading(false)
            if (refreshTimeout.current) {
                clearTimeout(refreshTimeout.current); // Clear the previous timer
            }

            const expirationTime = decodedToken.exp * 1000; // Convert to ms
            const currentTime = Date.now();
            const timeToRefresh = expirationTime - currentTime - 5 * 60 * 1000; // Refresh 5 minutes before expiry

            if (timeToRefresh > 0) {
                // setLoading(false)
                refreshTimeout.current = setTimeout(async () => {
                    try {
                        const {data, status} = await unprotectedRoute.post('/token/refresh')

                        if (!status === 200) throw new Error("Failed to refresh token");
                        console.log(`Access token refreshed : ${new Date(Date.now()).toLocaleString()}`)
                        setAccessToken(data.accessToken); // Update token in state
                    } catch (error) {
                        console.error(`Failed to refresh token : ${new Date(Date.now()).toLocaleString()}`, error);
                        setAccessToken(null)
                    }
                }, timeToRefresh);
                console.log('refresh timeout set')
            }
            
        }
        if(decodedToken) {
            setIsAuthenticated(true)
            scheduleTokenRefresh()

            return () => {
                console.log(`destroying previous refresh timer : ${new Date(Date.now()).toLocaleString()}`)
                if (refreshTimeout.current) {
                    clearTimeout(refreshTimeout.current); // Clear the timer on unmount
                }
            };
        }
    }, [accessToken])

    useEffect(() => {
        console.log('isAuthenticated === ', isAuthenticated)
        setLoading(false)
    }, [isAuthenticated])


    return (
        <TokenContext.Provider value={{ accessToken, setAccessToken, loading, setLoading, isAuthenticated, setIsAuthenticated }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);