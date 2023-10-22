import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Tasks } from './pages/tasks/Tasks';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

type Headers = {
  Authorization: string;
};

export function App() {
  const [headers, setHeaders] = useState<Headers | null>(null);

  const setLoginHeaders = (loginHeaders: Headers) => {
    setHeaders(loginHeaders);
  };

  return (
    <main>
      <header>
        <h2>To Do List</h2>
      </header>
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login setLoginHeaders={setLoginHeaders} />}
            />
            <Route path="/register" element={<Register />} />
            {headers ? (
              <Route path="/tasks" element={<Tasks headers={headers} />} />
            ) : null}
          </Routes>
        </BrowserRouter>
      </div>
      <footer></footer>
    </main>
  );
}
