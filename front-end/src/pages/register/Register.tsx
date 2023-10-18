import './Register.css';
import { useState } from 'react';
import axios from 'axios';

export function Register(){
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const body = {
            "username": userName,
            "name": name,
            "passWord": password
        }
  
        const response = await axios.post('http://localhost:8080/users/', body);
  
        console.log('Response data:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return(
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
                <label htmlFor="userName">User Name</label>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
            <div className="connectButton">
                <button onClick={handleLogin}>Register</button>
            </div>
        </>
    );
}