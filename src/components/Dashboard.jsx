import React from "react";
import PostForm from "./PostForm";
import PostStats from "./PostStats";
import SearchPosts from "./SearchPosts";
import usePosts from "../hooks/usePosts";
import './style.css';

/**
 * Dashboard Component
 * 
 * The `Dashboard` component serves as the main container for managing posts within the application. 
 * It integrates several sub-components to allow for creating posts, viewing post statistics, and searching through posts.
 * The state of posts and related operations are handled by the `usePosts` custom hook.
 * 
 * @component
 * @example
 * return (
 *   <Dashboard />
 * )
 * 
 * @returns {JSX.Element} The rendered Dashboard component.
 */
const Dashboard = () => {
  // Destructure necessary state and functions from the custom usePosts hook
  const {
    posts,
    total,
    success,
    failed,
    queueSize,
    createPost,
    resetState,
    searchPosts,
  } = usePosts();

  return (
    <div className="main-container">
      <div className="app">
        <h1>Post Manager</h1>
        
        {/* PostForm allows users to create new posts and reset the state */}
        <PostForm
          onCreatePost={createPost}
          onReset={resetState}
          itemCount={posts.length}
        />

        {/* PostStats displays various statistics about the posts */}
        <PostStats state={{ total, success, failed, queueSize, posts }} />

        {/* SearchPosts provides a search bar to filter posts based on a query */}
        <SearchPosts onSearch={searchPosts} />

        {/* List of all posts displayed below */}
        <div className="post-list">
          {posts.map((post) => (
            <div key={post._id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
