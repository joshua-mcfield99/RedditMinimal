import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/sidebar.module.css';

const SideBar = () => {
  const location = useLocation();
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await fetch('https://www.reddit.com/subreddits/popular.json');
        const data = await response.json();
        const subredditNames = data.data.children.map(child => child.data.display_name);
        setSubreddits(subredditNames);
      } catch (error) {
        console.error('Error fetching subreddits:', error);
      }
    };

    fetchSubreddits();
  }, []);

  return (
    <div className={styles.sidebar_container}>
      <ul>
        {subreddits.map(subreddit => (
          <li key={subreddit}>
            <Link
              to={`/r/${subreddit}`}
              style={{ color: location.pathname === `/r/${subreddit}` ? '#317cff' : '#000' }}
            >
              {subreddit}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;