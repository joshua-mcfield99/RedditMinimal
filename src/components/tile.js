import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/tile.module.css';
import { upvotePost, downvotePost } from '../redux/redditSlice';  // Import the actions
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const Tile = ({ id, title, img, comments, votes, posted, author }) => {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [currentVotes, setCurrentVotes] = useState(votes);
    const dispatch = useDispatch();

    const formatVotes = (votes) => {
        if (votes >= 1000) {
            return (votes / 1000).toFixed(1) + 'k';
        }
        return votes.toString();
    };

    const handleUpvote = () => {
        if (!isUpvoted) {
            setCurrentVotes(currentVotes + 1);
            dispatch(upvotePost(id));
            setIsUpvoted(true);
            if (isDownvoted) {
                setIsDownvoted(false);
                setCurrentVotes(currentVotes + 2); // Revert downvote and add upvote
            }
        } else {
            setCurrentVotes(currentVotes - 1);
            setIsUpvoted(false);
            // Optionally, dispatch a reverse action here if needed
        }
    };

    const handleDownvote = () => {
        if (!isDownvoted) {
            setCurrentVotes(currentVotes - 1);
            dispatch(downvotePost(id));
            setIsDownvoted(true);
            if (isUpvoted) {
                setIsUpvoted(false);
                setCurrentVotes(currentVotes - 2); // Revert upvote and add downvote
            }
        } else {
            setCurrentVotes(currentVotes + 1);
            setIsDownvoted(false);
            // Optionally, dispatch a reverse action here if needed
        }
    };

    return (
        <div className={styles.tile_container}>
            <div className={styles.wrapper}>
                <div className={styles.votes_container}>
                    <button
                        className={isUpvoted ? styles.upvoted_b : ''}
                        onClick={handleUpvote}
                        aria-label='Upvote button'
                    >
                        <ArrowUpwardRoundedIcon />
                    </button> 
                    <p className={isUpvoted ? styles.upvoted_t : isDownvoted ? styles.downvoted_t : styles.idle_t}>{formatVotes(currentVotes)}</p>
                    <button
                        className={isDownvoted ? styles.downvoted_b : ''}
                        onClick={handleDownvote}
                        aria-label='Downvote button'
                    >
                        <ArrowDownwardRoundedIcon />
                    </button> 
                </div>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    {img ? (
                        <img src={img} alt={title} />
                    ) : (
                        <div className={styles.placeholder_image}>No Image Available</div>
                    )}
                    <div className={styles.post_details}>
                        <p>Author: <span>{author}</span></p>
                        <p>{posted}</p>
                        <p>{comments} comments</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tile;