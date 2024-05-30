import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSubreddit } from '../redux/redditSlice';
import styles from '../styles/filter.module.css';

const Filter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subreddit = useSelector((state) => state.reddit.selectedSubreddit);

    const handleSubredditChange = (e) => {
        const selectedSubreddit = e.target.value;
        dispatch(setSubreddit(selectedSubreddit));
        navigate(`/r/${selectedSubreddit}`);
    };

    return (
        <div className={styles.filter_container}>
            <select value={subreddit} onChange={handleSubredditChange} aria-label='subreddit selector'>
                <option value="popular">Popular</option>
                <option value="reactjs">ReactJS</option>
                <option value="javascript">JavaScript</option>
                <option value="webdev">Web Development</option>
                <option value="programming">Programming</option>
                <option value="technology">Technology</option>
            </select>
        </div>
    );
};

export default Filter;