import React, { useState, useEffect } from 'react';
import PostItem from './components/PostItem.jsx';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {posts.map(post => <PostItem key={post.id} post={post} />)}
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default App;
