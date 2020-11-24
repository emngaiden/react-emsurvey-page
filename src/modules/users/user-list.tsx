import React from 'react';
import { IRootState } from 'src/shared/reducers';
import { getAllUsers } from 'src/shared/reducers/users.reducer';
import { connect } from 'react-redux';
import { translate } from 'src/shared/utils/translation/translation';
import { verifyArray } from 'src/shared/utils/app.utils';
import { RouteComponentProps, Link } from 'react-router-dom';
import Loading from 'src/shared/layout/loading';

export interface IUserListProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

class UserList extends React.Component<IUserListProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    render() {
        const { users, loading } = this.props;
        const createUserButton = (
            <Link to={`${this.props.match.url}/new`}>
                {translate('user.createUser')}
            </Link>
        );
        if(loading) {
            return <Loading />
        }
        if(!verifyArray(users)) {
            return (
                <div>
                    <div>
                        {createUserButton}
                    </div>
                    <div>
                        {translate('app.noItems')}
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div>
                    {createUserButton}
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    {translate('app.id')}
                                </td>
                                <td>
                                    {translate('user.firstName')}
                                </td>
                                <td>
                                    {translate('user.lastName')}
                                </td>
                                <td>
                                    {translate('user.login')}
                                </td>
                                <td>
                                    {translate('user.email')}
                                </td>
                                <td>
                                    {translate('user.language')}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr>
                                    <td>
                                        {user.id}
                                    </td>
                                    <td>
                                        {user.firstName}
                                    </td>
                                    <td>
                                        {user.lastName}
                                    </td>
                                    <td>
                                        {user.login}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.password}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: IRootState) => ({
    users: state.users.usersList,
    loading: state.users.loading
});

const mapDispatchToProps = {
    getAllUsers
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);

