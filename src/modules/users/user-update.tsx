import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserDataForm from './user-data-form';
import { connect } from 'react-redux';
import { IUser } from 'src/shared/model/user.model';
import { IRootState } from 'src/shared/reducers';
import { getUser, updateUser, createUser } from 'src/shared/reducers/users.reducer';
import { verifyObject } from 'src/shared/utils/app';
import Loading from 'src/shared/layout/loading';
import Updating from 'src/shared/layout/updating';
import Creating from 'src/shared/layout/creating';

interface IUserUpdateState {
    isNew: boolean;
}

interface IUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

class UserUpdate extends React.Component<IUserUpdateProps, IUserUpdateState> {
    constructor(props){
        super(props)
        this.onValidSubmit = this.onValidSubmit.bind(this);
    }

    onValidSubmit(user: IUser, event: any) {
        this.props.createUser(user);
        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        const { user, loading, updating, creating } = this.props;
        if(loading) {
            return <Loading />
        }
        return (
            <div>
                <div>
                {updating && <Updating />}
                {creating && <Creating />}
                </div>
                <UserDataForm onSubmit={this.onValidSubmit} disabled={updating || creating} user={verifyObject(user) ? user : undefined} />
            </div>   
        );
    }
}

const mapStateToProps = ({ users }: IRootState) => ({
    user: users.user,
    loading: users.loading,
    updating: users.updating,
    creating: users.creating
})

const mapDispatchToProps = {
    getUser,
    updateUser,
    createUser
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserUpdate);