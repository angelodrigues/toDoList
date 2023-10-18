import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Headers = {
  Authorization: string;
};

type LoginProps = {
  setLoginHeaders: (headers: Headers) => void;
}

export function Login({ setLoginHeaders }: LoginProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const authString = btoa(`${name}:${password}`);

      const headers: Headers = {
        Authorization: `Basic ${authString}`,
      };

      const response = await axios.get('http://localhost:8080/tasks/', {
        headers: headers,
      });

      setLoginHeaders(headers);

      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
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
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="register">
        <Link to="../register">New Register</Link>
      </div>
      <div className="connectButton">
        <Link to="../tasks"><button onClick={handleLogin}>Go to tasks !</button></Link>
      </div>
    </>
  );
}
