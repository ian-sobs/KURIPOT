// TokenContext.js
import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <TokenContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);