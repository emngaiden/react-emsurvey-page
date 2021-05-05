import React from 'react';
import { RouteProps } from 'react-router-dom';
import { IRootState } from 'src/shared/reducers';
import { connect } from 'react-redux';


interface IPrivateRouteProps extends RouteProps{
    permisions?: string[];
}

class PrivateRoute extends React.Component<RouteProps, StateProps> {

}

const mapStateToProps = ({ locale }: IRootState) => ({

})

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
    mapStateToProps,
    null,
    null,
    {pure: false}
)(PrivateRoute)
