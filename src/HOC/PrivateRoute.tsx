import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Paths } from '../routes/Paths';
import { useCustomUser } from '../services/user';
import { userStore } from '../store/userStore';

const PrivateRoute = () => {
    const { setUser } = userStore()
    const localAccess = localStorage.getItem('access_token');
    const navigate = useNavigate();
    useEffect(()=>{
        if (!localAccess) {
            navigate(Paths.login)
        }
    }, [localAccess])

    const {data} = useCustomUser();
    
    useEffect(()=>{
        if (data) {
            setUser(data)
        }
        // console.log(data);
    }, [data])
  return (
    <Outlet/>
  )
}

export default PrivateRoute