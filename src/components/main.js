import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPosts, searchPosts, selectFilteredPosts } from '../redux/redditSlice';
import styles from '../styles/main.module.css';
import Tile from './tile';
import Filter from './filter';

const Main = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const status = useSelector((state) => state.reddit.status);
  const error = useSelector((state) => state.reddit.error);
  const subreddit = useSelector((state) => state.reddit.selectedSubreddit);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      dispatch(searchPosts(query));
    } else {
      dispatch(fetchPosts(subreddit));
    }
  }, [subreddit, dispatch, location.search]);

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.main_container}>
      <Filter />
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.post_container}>
            <Tile
              id={post.id}
              title={post.title}
              img={post.imageSrc}
              author={post.author}
              comments={post.comments}
              votes={post.votes}
              posted={post.created}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;