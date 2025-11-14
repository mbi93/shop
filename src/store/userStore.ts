import { create } from 'zustand'
import type { IUser } from '../types'
import { devtools } from 'zustand/middleware'

type Store = {
  user: null | IUser
  setUser: (val: IUser) => void
  logoutUser: ()=>void
}

export const userStore = create<Store>()( devtools((set) => ({
  user: null,
  setUser: (val) => set({user: val}),
  logoutUser: ()=> set({user: null})
})))
