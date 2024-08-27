import React, { useState } from 'react';

/**
 * PostForm Component
 *
 * The `PostForm` component allows users to create a new post by submitting a title and message. 
 * It also provides a reset functionality to clear the form and displays the current count of items (posts).
 *
 * @param {Object} props - The properties passed to the PostForm component.
 * @param {Function} props.onCreatePost - The function to call when a new post is created.
 * @param {Function} props.onReset - The function to call when the reset button is clicked.
 * @param {number} props.itemCount - The current number of items (posts).
 * 
 * @returns {JSX.Element} The rendered PostForm component.
 */
const PostForm = ({ onCreatePost, onReset, itemCount }) => {
  const [title, setTitle] = useState(''); // State to store the post title
  const [message, setMessage] = useState(''); // State to store the post message

  /**
   * Handles the form submission to create a new post.
   *
   * This function prevents the default form submission behavior,
   * calls the `onCreatePost` function with the current title and message,
   * and then clears the input fields.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event triggered on submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePost({ title, message }); // Trigger the creation of a new post
    setTitle(''); // Reset the title input field
    setMessage(''); // Reset the message input field
  };

  return (
    <div className="post-form-container">
      {/* Display the current item count */}
      <div className="item-count-display">
        <p>Current Item Count: {itemCount}</p>
      </div>

      {/* Form for creating a new post */}
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
        <button type="submit" className='btn'>Create Post</button>

        {/* Reset button to clear the form and reset state */}
        <button type="button" className='btn' onClick={onReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default PostForm;
