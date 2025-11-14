import React, { useEffect, type FC, type ReactNode } from "react"
import User from "../components/User/User"
import { cartStore } from "../store/cartStore"

interface IUserLayoutProps {
    children: ReactNode
}

const UserLayout: FC<IUserLayoutProps> = ({children}) => {
  const {cart, changeTotal} = cartStore();
  useEffect(()=>{
    const localCart = JSON.stringify(cart);
    localStorage.setItem('cart', localCart)
    changeTotal()
  }, [cart])
  return (
    <div className="user-layout">
        <User/>
        <div className="container">
            {children}
        </div>
    </div>
  )
}

export default UserLayout