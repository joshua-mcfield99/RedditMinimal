import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';


const initialState = {
    posts: [],
    status: 'idle',
    error: null
};


export const fetchPosts = createAsyncThunk('reddit/fetchPosts', async () => {
    const response = await axios.get('https://www.reddit.com/r/popular.json');
    const posts = response.data.data.children.map(post => {
        let imageSrc = null;
        if (post.data.preview && post.data.preview.images && post.data.preview.images[0]) {
            imageSrc = post.data.preview.images[0].source.url.replace('&amp;', '&');
        }
        return {
            id: post.data.id,
            title: post.data.title,
            imageSrc: imageSrc,
            author: post.data.author,
            created: formatDistanceToNow(new Date(post.data.created_utc * 1000)),
            upvotable: !post.data.locked,
            downvotable: !post.data.locked,
            votes: post.data.ups,
            comments: post.data.num_comments
        };
    }).filter(post => post.imageSrc);
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
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }
});


export const { upvotePost, downvotePost } = redditSlice.actions;
export default redditSlice.reducer;