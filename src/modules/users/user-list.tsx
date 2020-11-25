import React from 'react';
import { IRootState } from 'src/shared/reducers';
import { getAllUsers, deleteUser } from 'src/shared/reducers/users.reducer';
import { connect } from 'react-redux';
import { translate } from 'src/shared/utils/translation';
import { verifyArray, getAvailableLanguages, arrayToObject } from 'src/shared/utils/app';
import { RouteComponentProps, Link } from 'react-router-dom';
import Loading from 'src/shared/layout/loading';
import { IUser } from 'src/shared/model/user.model';

export interface IUserListProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

class UserList extends React.Component<IUserListProps> {
    languagesList: any;
    constructor(props) {
        super(props);
        this.languagesList = arrayToObject(getAvailableLanguages(), 'key');
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    onDelete(user: IUser) {
        const c = confirm(
            translate('user.confirm.delete', { name: user.login })
        );
        if(c) {
            this.props.deleteUser(user.id);
        }
    }

    onEdit(id: string) {
        this.props.history.push(`${this.props.location.pathname}/edit/${id}`);
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
                                <th>
                                    {translate('app.id')}
                                </th>
                                <th>
                                    {translate('user.firstName')}
                                </th>
                                <th>
                                    {translate('user.lastName')}
                                </th>
                                <th>
                                    {translate('user.login')}
                                </th>
                                <th>
                                    {translate('user.email')}
                                </th>
                                <th>
                                    {translate('user.language')}
                                </th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
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
                                    <td>
                                        {this.languagesList[user.langKey].name}
                                    </td>
                                    <td>
                                        <button onClick={() => this.onEdit(user.id)}>
                                            {translate('app.edit')}
                                        </button>
                                        <button onClick={() => this.onDelete(user)}>
                                            {translate('app.delete')}
                                        </button>
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

const mapStateToProps = ({ users }: IRootState) => ({
    users: users.usersList,
    loading: users.loading,
    deleting: users.deleting,
    loadingSuccess: users.loadingSuccess,
    deletingSuccess: users.deleteSuccess
});

const mapDispatchToProps = {
    getAllUsers,
    deleteUser
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);

