import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * PostStats component to display statistics of posts.
 * @param {Object} props - The props for the component.
 * @param {Object} props.state - The state object containing statistics.
 * @param {number} props.state.total - The total number of posts attempted.
 * @param {number} props.state.success - The number of successful posts.
 * @param {number} props.state.failed - The number of failed posts.
 * @param {number} props.state.queueSize - The current size of the queue.
 * @param {Array} props.state.posts - The array of posts stored in MongoDB.
 * @returns {JSX.Element} The rendered component.
 */
const PostStats = ({ state }) => {
  const [queueSize, setQueueSize] = useState(state.queueSize);

  useEffect(() => {
    const fetchQueueSize = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/queue-size");
        setQueueSize(response.data.queueSize);
      } catch (error) {
        console.error("Error fetching queue size:", error);
      }
    };

    fetchQueueSize();
    // Optionally set an interval to periodically fetch queue size
    const intervalId = setInterval(fetchQueueSize, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="post-stats">
      <p>Total Posts Attempted: {state.total}</p>
      <p>Successful Posts: {state.success}</p>
      <p>Failed Posts: {state.failed}</p>
      <p>Queue Size: {queueSize}</p>
      <p>Posts in MongoDB: {state.posts.length}</p>
    </div>
  );
};

export default PostStats;
