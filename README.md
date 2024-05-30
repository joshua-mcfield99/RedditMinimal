# Reddit Minimal

**Reddit Minimal** is a simplified Reddit client built using React and Redux. The application allows users to browse posts from various subreddits, filter posts by selected subreddits, perform searches, and view posts based on search queries.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Redux State Management](#redux-state-management)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse posts from various subreddits.
- Filter posts by selected subreddits.
- Perform searches to view posts based on search queries.
- Upvote and downvote posts.
- Dynamic URL updates to reflect the current subreddit or search query.
- Responsive design for mobile and desktop users.

## Technologies

- React: For building the user interface.
- Redux: For state management.
- React Router: For routing.
- Axios: For making HTTP requests to the Reddit API.
- Date-fns: For formatting dates.
- Material-UI Icons: For adding icons.
- CSS Modules: For styling components.
- `he`: For decoding HTML entities.

## Usage

- **Browse Subreddits:**
  Select a subreddit from the dropdown menu to view posts from that subreddit. The URL will update to reflect the selected subreddit.

- **Search Posts:**
  Use the search bar to enter a search query. The application will display posts related to the search query, and the URL will update to include the search query parameter.

- **Upvote and Downvote:**
  Use the upvote and downvote buttons on each post to vote on posts. The vote count will update accordingly.

## Project Structure

- reddit-minimal/
- ├── public/
- │ ├── index.html
- │ └── ...
- ├── src/
- │ ├── components/
- │ │ ├── Filter.js
- │ │ ├── Header.js
- │ │ ├── Main.js
- │ │ ├── SearchBar.js
- │ │ ├── Tile.js
- │ │ └── ...
- │ ├── redux/
- │ │ ├── redditSlice.js
- │ │ └── store.js
- │ ├── styles/
- │ │ ├── filter.module.css
- │ │ ├── main.module.css
- │ │ ├── searchbar.module.css
- │ │ └── tile.module.css
- │ ├── App.js
- │ ├── index.js
- │ └── ...
- ├── package.json
- └── README.md

css


## Redux State Management

- **State Structure:**
  ```javascript
  {
    posts: [],
    filteredPosts: [],
    status: 'idle', // or 'loading', 'succeeded', 'failed'
    error: null,
    selectedSubreddit: 'popular',
  }

**Actions:**

- fetchPosts(subreddit): Fetches posts from the specified subreddit.
- searchPosts(query): Fetches posts based on the search query.
- setSubreddit(subreddit): Sets the selected subreddit.
- upvotePost(postId): Upvotes the specified post.
- downvotePost(postId): Downvotes the specified post.

## API Endpoints

Fetch Posts from Subreddit:

GET https://www.reddit.com/r/{subreddit}.json?limit=25

Search Posts:

GET https://www.reddit.com/search.json?q={query}&limit=25

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
License
