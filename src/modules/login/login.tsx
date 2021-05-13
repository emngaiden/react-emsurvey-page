import React from 'react';
import { RouteComponentProps } from 'react-router';
import LoginDataForm from './login-data-form';
import { IRootState } from 'src/shared/reducers';
import { login } from 'src/shared/reducers/auth.reducer';
import { connect } from 'react-redux';
import { ILoginDTO } from 'src/shared/model/dto/login.dto';


interface LoginProps extends RouteComponentProps, DispatchProps, StateProps {}

class Login extends React.Component<LoginProps>{

    constructor(props) {
        super(props);

    }

    sendLoginInfo(data: ILoginDTO, event) {
        this.props.login(data);
    }

    render() {
        return (
            <LoginDataForm onSubmit={this.props.login} isAuthenticated={this.props.isAuthenticated} />
        );
    }
}

const mapStateToProps = ({ auth }: IRootState) => ({
    isAuthenticated: auth.isAuthenticated
})

const mapDispatchToProps = {
    login
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);