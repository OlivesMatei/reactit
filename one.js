import React, { useState, useEffect } from 'react';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ]);

        const users = await usersResponse.json();
        const posts = await postsResponse.json();

        const data = users.map(user => ({
          id: user.id,
          name: user.name,
          postCount: posts.filter(post => post.userId === user.id).length
        }));

        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>User Posts</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {userData.map(user => (
          <li key={user.id} style={{ marginBottom: '10px', fontSize: '18px' }}>
            <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{user.name}</span> -{' '}
            <span style={{ color: '#e74c3c' }}>{user.postCount} posts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
