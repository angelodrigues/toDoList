import './Login.css';

export function Login(){
    return(
        <main>
            <header>
                <h2>To Do List</h2>
            </header>
            <div className="content">
                <div className="inputData">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" />
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" />
                </div>
                <div className="register">
                    <a href="http://" target="_blank" rel="noopener noreferrer">New Register</a>
                </div>
                <div className="connectButton">
                    <button>Go to tasks !</button>
                </div>
            </div>
            <footer></footer>
        </main>
    );
}