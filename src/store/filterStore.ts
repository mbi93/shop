import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Store = {
  limit: number,
  offset: number,
  setOffsetVal: (val: number) => void,
  sortVal: string,
  setSortVal: (val: string) => void,
  searchVal: string,
  setSearchVal: (val: string) => void,
  currentPage: number,
  setCurrentPage: (val: number)=> void
}

export const filterStore = create<Store>()( devtools((set) => ({
    limit: 6,
    offset: 0,
    setOffsetVal: (val) => set({offset: val}),
    sortVal: '',
    setSortVal: (val) => set({sortVal: val}),
    searchVal: '',
    setSearchVal: (val) => set({searchVal: val}),
    currentPage: 0,
    setCurrentPage: (val) => set({currentPage: val}),
})))
