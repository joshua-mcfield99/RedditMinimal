import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { searchPosts } from '../redux/redditSlice'; // Import the search action
import styles from '../styles/searchbar.module.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            dispatch(searchPosts(query));
            navigate(`/search?q=${query}`);
        }
    };
    
    return (
        <form className={styles.search_container} onSubmit={handleSubmit}>
            <input 
                placeholder='Search'
                value={query}
                onChange={handleInputChange}
            />
            <button type="submit" aria-label='search button'>
                <SearchIcon />
            </button>
        </form>
    );
};

export default SearchBar;