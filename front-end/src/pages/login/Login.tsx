import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',    
  },
};

type Headers = {
  Authorization: string;
};

type LoginProps = {
  setLoginHeaders: (headers: Headers) => void;
}

export function Login({ setLoginHeaders }: LoginProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
        <a href="#" onClick={openModal}>New Register</a>
        {/* <Link to="../register">New Register</Link> */}
      </div>
      {/* <div className="modal">
        <button onClick={openModal}>Open</button>
      </div> */}
      {modalIsOpen && <div className="dark-backdrop"></div>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
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
      </Modal>
      <div className="connectButton">
        <Link to="../tasks"><button onClick={handleLogin}>Go to tasks !</button></Link>
      </div>
    </>
  );
}
