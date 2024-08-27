import React from "react";
import PostForm from "./PostForm";
import PostStats from "./PostStats";
import SearchPosts from "./SearchPosts";
import usePosts from "../hooks/usePosts";

/**
 * Main App component that integrates all sub-components.
 *
 * @returns The rendered App component.
 */
const Dashboard = () => {
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
    <div className="app">
      <h1>Post Manager</h1>
      <PostForm
        onCreatePost={createPost}
        onReset={resetState}
        itemCount={posts.length}
      />
      <PostStats state={{ total, success, failed, queueSize, posts }} />
      <SearchPosts onSearch={searchPosts} />
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
