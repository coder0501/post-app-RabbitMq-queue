import React, { useState } from 'react';

/**
 * Component for creating a new post, resetting state, and showing the current item count.
 *
 * @param props - The props for the PostForm component.
 * @returns The rendered PostForm component.
 */
const PostForm = ({ onCreatePost, onReset, itemCount }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Handles the form submission to create a new post.
   * @param e - The form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePost({ title, message });
    setTitle('');
    setMessage('');
  };

  return (
    <div className="post-form-container">
      <div className="item-count-display">
        <p>Current Item Count: {itemCount}</p>
      </div>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <button type="submit">Create Post</button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default PostForm;
