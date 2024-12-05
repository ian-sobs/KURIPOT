import { Navigate, Outlet } from 'react-router-dom'
import { isExpired, decodeToken } from "react-jwt";
import { TokenContext } from '../token/TokenContext';

const PrivateRoutes = () => {
    const { accessToken, setAccessToken } = useContext(TokenContext);
    const decodedToken = decodeToken(accessToken)
    const tokenIsExpired = isExpired(accessToken)

    return (
        (!decodedToken || tokenIsExpired) ? <Outlet/> : <Navigate to='/signin'/>
    )
}

export default PrivateRoutes