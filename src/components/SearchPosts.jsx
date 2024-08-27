import React, { useState, FormEvent } from 'react';

/**
 * SearchPosts component to search for posts.
 * @param {Object} props - The props for the component.
 * @param {Function} props.onSearch - Function to handle the search query.
 * @returns {JSX.Element} The rendered component.
 */
const SearchPosts = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="search-posts">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Posts"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchPosts;
