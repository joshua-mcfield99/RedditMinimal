import React from 'react';
import SearchBar from './searchBar';
import styles from '../styles/header.module.css';
import { ReactComponent as RedditLogo } from '../assets/Reddit_Icon_2Color.svg'

const Header = () => {
  return (
    <header className={styles.head}>
        <div className={styles.logo}>
            <RedditLogo className={styles.reddit_logo}/>
            <p>Reddit<span>Minimal</span></p>
        </div>
        <div className={styles.search_bar}>
            <SearchBar/>
        </div>
    </header>
  )
}

export default Header