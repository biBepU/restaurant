
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'

export default function AuthRoute({children}) {
   const location = useLocation();
   const {user} = useAuth(); 
  return user&& user.role=="admin" ? (
    children
  ):(
    <Navigate to={`/?returnUrl=${location.pathname}`} replace/>
  )
}
