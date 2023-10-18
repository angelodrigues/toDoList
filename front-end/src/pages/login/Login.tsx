import './Login.css';
import { useState } from 'react';
import axios from 'axios';

export function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Create a base64-encoded string of "name:password"
      const authString = btoa(`${name}:${password}`);

      // Create headers with the Basic Authentication credentials
      const headers = {
        Authorization: `Basic ${authString}`,
      };

      // Make an Axios GET request to your API
      const response = await axios.get('http://localhost:8080/tasks/', {
        headers: headers,
      });

      // Handle the response here, e.g., update your state or navigate to another page
      console.log('Response data:', response.data);
    } catch (error) {
      // Handle any errors that may occur during the request
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <header>
        <h2>To Do List</h2>
      </header>
      <div className="content">
        <div className="inputData">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password" // Use type="password" to hide the password
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            New Register
          </a>
        </div>
        <div className="connectButton">
          <button onClick={handleLogin}>Go to tasks !</button>
        </div>
      </div>
      <footer></footer>
    </main>
  );
}
