import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <input type="text" id="user" />
                <input type="password" id="password" />
                <button type="submit" id="submit" >Entrar</button>
            </div>
        );
    }
}

export default Login;