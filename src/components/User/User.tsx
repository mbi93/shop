import { NavLink } from 'react-router'
import { Paths } from '../../routes/Paths'
import { cartIcon, logoutIcon, menuIcon, userIcon, userPhoto } from '../../utils'
import s from './user.module.scss'
import CustomBtn from '../UI/CustomBtn'
import { userStore } from '../../store/userStore'
import UserSkeleton from './UserSkeleton'
import { cartStore } from '../../store/cartStore'

const links = [
    {url: Paths.menu, icon: menuIcon, name: 'Меню'},
    {url: Paths.cart, icon: cartIcon, name: 'Корзина'},
    {url: Paths.profile, icon: userIcon, name: 'Профиль'},
]

const User = () => {
    const {logoutUser, user} = userStore()
    const {cart} = cartStore();
    const totalAmount = cart.reduce((acc, elem)=>{
        return acc + elem.amount
    }, 0)
    // console.log(user);
    const logout = ()=>{
        logoutUser()
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    const userImg = user && user.avatar ? import.meta.env.VITE_IMG_URL + user.avatar : userPhoto
  return (
    <div className={s.user}>
        {
            user ? 
            <>
                <div className={s.user__info}>
                    <img src={userImg} alt="" className={s.user__img} />
                    <h2 className={s.user__name}>{user.username}</h2>
                    <p className={s.user__email}>{user.email}</p>
                </div>
                <ul className={s.user__menu}>
                    {
                        links.map((elem)=>(
                            <li key={elem.url}>
                                <NavLink className={s.user__link} to={elem.url}>
                                    <img src={elem.icon} alt="" />
                                    <span className={s.user__text}>  {elem.name}</span>  
                                  
                                    {
                                        elem.url == Paths.cart && totalAmount ?
                                        <span className={s.user__count}>{totalAmount}</span> : ''
                                    }
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>            
            </>
            : <UserSkeleton/>
        }
        <CustomBtn
            text='Выйти'
            width={117}
            icon={logoutIcon}
            mt='auto'
            onClick={logout}
            className={s.user__btn}
        />
    </div>
  )
}

export default User