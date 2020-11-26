import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserDataForm from './user-data-form';
import { connect } from 'react-redux';
import { IUser } from 'src/shared/model/user.model';
import { IRootState } from 'src/shared/reducers';
import { getUser, updateUser, createUser, reset } from 'src/shared/reducers/users.reducer';
import { verifyObject } from 'src/shared/utils/app';
import Loading from 'src/shared/layout/loading';
import Updating from 'src/shared/layout/updating';
import Creating from 'src/shared/layout/creating';
import { translate } from 'src/shared/utils/translation';

interface IUserUpdateState {
    isNew: boolean;
}

interface IUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

class UserUpdate extends React.Component<IUserUpdateProps, IUserUpdateState> {
    constructor(props){
        super(props)
        this.onValidSubmit = this.onValidSubmit.bind(this);
        this.state = {
            isNew: this.props.match.params.id === undefined
        }
    }

    onValidSubmit(user: IUser, event: any) {
        event.stopPropagation();
        event.preventDefault();
        if(this.state.isNew) {
            this.props.createUser(user);
        } else {
            this.props.updateUser(user);
        }
    }

    componentDidMount() {
        if(!this.state.isNew) {
            this.props.getUser(this.props.match.params.id)
        }
    }

    render() {
        const { user, loading, updating, creating } = this.props;
        return (
            <div>
                <h1>{translate('entity.user.create')}</h1>
                {loading ?
                (
                    <Loading />
                ) : (
                    <div>
                        <div>
                        {updating && <Updating />}
                        {creating && <Creating />}
                        </div>
                        <UserDataForm onSubmit={this.onValidSubmit} disabled={loading || updating || creating} user={verifyObject(user) ? user : undefined} />
                    </div>   
                )};
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