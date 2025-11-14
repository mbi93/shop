import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Paths } from '../routes/Paths';

const PublicRoute = () => {
    const localAccess = localStorage.getItem('access_token');
    const navigate = useNavigate();
    useEffect(()=>{
        if (localAccess) {
            navigate(Paths.menu)
        }
    }, [localAccess])
    
  return (
    <Outlet/>
  )
}

export default PublicRoute