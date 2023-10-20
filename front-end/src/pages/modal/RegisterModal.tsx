export function RegisterModal() {
    return(
        <>
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
        </>
    );
}