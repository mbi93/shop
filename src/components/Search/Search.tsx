import React, { useState } from 'react'
import { closeIcon, searchclose, searchIcon } from '../../utils'
import s from './search.module.scss'
import { filterStore } from '../../store/filterStore'

const Search = () => {
  const [search, setSearch] = useState('')
  const {setSearchVal} = filterStore()
  const confirm = (event: React.FormEvent)=>{
    event.preventDefault()
    setSearchVal(search)
  }
  const clear = ()=>{
    setSearch('');
    setSearchVal('')
  }
  return (
    <form onSubmit={confirm} action="" className={s.search}>
      <button>
        <img src={searchIcon} alt="" />
      </button>
      <input value={search} onChange={(event)=>{setSearch(event.target.value)}} type="text" className={s.search__input} placeholder='Введите блюдо или состав'/>
      {
        search && <img onClick={clear} src={searchclose} alt="" className={s.search__clear} />
      }
    </form>
  )
}

export default Search