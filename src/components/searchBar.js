import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/searchbar.module.css';

const SearchBar = () => {
  return (
    <>
        <form className={styles.search_container}>
            <input placeholder='Search'/>
            <button><SearchIcon /></button>
        </form>
    </>
  )
}

export default SearchBar