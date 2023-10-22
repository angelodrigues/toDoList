import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate
import Modal from 'react-modal';

// Estilos personalizados para o modal
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
};

export function Login({ setLoginHeaders }: LoginProps) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState<string>(''); // Estado para a mensagem de erro
  const navigate = useNavigate(); // Use useNavigate em vez de useHistory

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRegister = async () => {
    try {
      const body = {
        username: userName,
        name: name,
        passWord: password,
      };

      const response = await axios.post('http://localhost:8080/users/', body);

      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const authString = btoa(`${login}:${pass}`);
      const headers: Headers = {
        Authorization: `Basic ${authString}`,
      };

      const response = await axios.get('http://localhost:8080/tasks/', {
        headers: headers,
      });

      setLoginHeaders(headers);

      console.log('Response data:', response.data);

      // Redirecione para a próxima rota após o login bem-sucedido
      navigate('/tasks');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          // Atualize o estado de erro com a mensagem apropriada
          setError('Usuário ou senha incorretos. Tente novamente.');
        } else {
          console.error('Error:', err);
        }
      }
    }
  };

  return (
    <>
      <div className="inputData">
        <label htmlFor="login">Nome</label>
        <input
          type="text"
          name="login"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="pass"
          id="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className="register">
        <a href="#" onClick={openModal}>
          New Register
        </a>
      </div>
      {error && <div className="error-message">{error}</div>}
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
          <button onClick={handleRegister}>Register</button>
        </div>
      </Modal>
      <div className="connectButton">
        <Link to="/tasks">
          <button onClick={handleLogin}>Go to tasks!</button>
        </Link>
      </div>
    </>
  );
}
