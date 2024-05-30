import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import he from 'he';

const initialState = {
    posts: [],
    filteredPosts: [],
    status: 'idle',
    error: null,
    selectedSubreddit: 'popular', // Default subreddit
};

export const fetchPosts = createAsyncThunk('reddit/fetchPosts', async (subreddit) => {
    let allPosts = [];
    let after = null;
    const limit = 25;
    
    while (allPosts.length < limit) {
        const url = `https://www.reddit.com/r/${subreddit}.json?limit=25${after ? `&after=${after}` : ''}`;
        const response = await axios.get(url);
        
        const posts = response.data.data.children.map(post => {
            let imageSrc = null;
            if (post.data.preview && post.data.preview.images && post.data.preview.images[0]) {
                imageSrc = post.data.preview.images[0].source.url.replace('&amp;', '&');
            }
            return {
                id: post.data.id,
                title: he.decode(post.data.title), // Decode HTML entities
                imageSrc: imageSrc,
                author: post.data.author,
                created: formatDistanceToNow(new Date(post.data.created_utc * 1000)),
                upvotable: !post.data.locked,
                downvotable: !post.data.locked,
                votes: post.data.ups,
                comments: post.data.num_comments,
            };
        });
        
        allPosts = [...allPosts, ...posts];
        after = response.data.data.after;
        
        if (!after) break; // Exit loop if there are no more posts
    }
    
    return allPosts.slice(0, limit); // Return only the first 25 posts
});

export const searchPosts = createAsyncThunk('reddit/searchPosts', async (query) => {
    const url = `https://www.reddit.com/search.json?q=${query}&limit=25`;
    const response = await axios.get(url);
    
    const posts = response.data.data.children.map(post => {
        let imageSrc = null;
        if (post.data.preview && post.data.preview.images && post.data.preview.images[0]) {
            imageSrc = post.data.preview.images[0].source.url.replace('&amp;', '&');
        }
        return {
            id: post.data.id,
            title: he.decode(post.data.title), // Decode HTML entities
            imageSrc: imageSrc,
            author: post.data.author,
            created: formatDistanceToNow(new Date(post.data.created_utc * 1000)),
            upvotable: !post.data.locked,
            downvotable: !post.data.locked,
            votes: post.data.ups,
            comments: post.data.num_comments,
        };
    });
    
    return posts;
});

const redditSlice = createSlice({
    name: 'reddit',
    initialState,
    reducers: {
        upvotePost: (state, action) => {
            const post = state.posts.find(post => post.id === action.payload);
            if (post) post.votes += 1;
        },
        downvotePost: (state, action) => {
            const post = state.posts.find(post => post.id === action.payload);
            if (post) post.votes -= 1;
        },
        setSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
            state.filteredPosts = action.payload; // Initialize filteredPosts with all posts
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(searchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(searchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
            state.filteredPosts = action.payload; // Initialize filteredPosts with all posts
        })
        .addCase(searchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { upvotePost, downvotePost, setSubreddit } = redditSlice.actions;

export const selectFilteredPosts = (state) => state.reddit.filteredPosts;

export default redditSlice.reducer;