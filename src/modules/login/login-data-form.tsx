import React from 'react';
import { translate } from 'src/shared/utils/translation';
import { Formputter, IFormputterProps, Inputter, required } from 'src/components/inputter';
import { Redirect } from 'react-router';

interface LoginDataFormProps extends IFormputterProps {
    isAuthenticated: boolean;
}

const initialState = {
    login: '',
    password: ''
}

type LoginDataFormState = typeof initialState;

class LoginDataForm extends React.Component<LoginDataFormProps, LoginDataFormState> {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event) {
        const nState = {...this.state};
        const name = event.target.name;
        nState[name] = event.target.value;
        this.setState(nState);
    }

    render(){
        const { isAuthenticated, ...rest } = this.props;
        if(isAuthenticated) {
            return <Redirect to="/"/>
        }
        return (
            <Formputter {...rest} submitText={translate('login.login')} model={{...this.state}}>
                <table>
                    <thead>
                        <tr>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {translate('login.username')}
                            </td>
                            <td>
                                <Inputter value={this.state.login} id="login-username" validators={[required()]} onChange={this.onFieldChange} name="login" type='text'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {translate('login.password')}
                            </td>
                            <td>
                                <Inputter value={this.state.password} id="login-password" validators={[required()]} onChange={this.onFieldChange} name="password" type='password'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Formputter>
        );
    }
}

export default LoginDataForm;