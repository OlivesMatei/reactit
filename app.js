import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch users
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));

    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  // Function to count the number of posts per user
  const getPostCount = (userId) => {
    return posts.filter(post => post.userId === userId).length;
  };

  return (
    <div>
      <h1>User Posts</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {getPostCount(user.id)} posts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
