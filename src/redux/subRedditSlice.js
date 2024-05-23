// SubredditSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularSubreddits = createAsyncThunk(
  'subreddits/fetchPopularSubreddits',
  async () => {
    const response = await fetch('https://www.reddit.com/subreddits/popular.json');
    const data = await response.json();
    const subredditNames = data.data.children.map(child => child.data.display_name);
    return subredditNames;
  }
);

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPopularSubreddits.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularSubreddits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPopularSubreddits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subredditSlice.reducer;

export const selectSubreddits = state => state.subreddits.list;