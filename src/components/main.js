import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/redditSlice';
import styles from '../styles/main.module.css'
import Tile from './tile'


/*const data = [
    {
        title: 'title 1',
        author: 'Mr ABC',
        img: 'image src goes here',
        comments: [],
        voting: true,
        votes: '5.7k',
        posted: '5 hours ago'
    },
    {
        title: 'title 2',
        author: 'Mr ABC',
        img: 'image src goes here',
        comments: [],
        voting: true,
        votes: '6k',
        posted: '8 hours ago'
    },
    {
        title: 'title 3',
        author: 'Mr ABD',
        img: 'image src goes here',
        comments: [],
        voting: true,
        votes: '2.3k',
        posted: '8 hours ago'
    }
]*/

const Main = () => {
    const { subreddit } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.reddit.posts);
    const status = useSelector((state) => state.reddit.status);
    const error = useSelector((state) => state.reddit.error);


    useEffect(() => {
        if (subreddit) {
            dispatch(fetchPosts(subreddit));
          } else {
            dispatch(fetchPosts('popular'));
          }
        }, [subreddit, dispatch]);
    
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    
    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.main_container}>
            {posts.map(post => {
                return (
                    <li key={post.id} className={styles.post_container}>
                        <Tile 
                            title={post.title} 
                            img={post.imageSrc}
                            author={post.author} 
                            comments={post.comments} 
                            votes={post.votes} 
                            posted={post.created} 
                        />
                    </li>
                )
            })}
        </div>
    )
}

export default Main