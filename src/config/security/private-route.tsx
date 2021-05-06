import React from 'react';
import { RouteProps, Redirect, Route } from 'react-router-dom';
import { IRootState } from 'src/shared/reducers';
import { connect } from 'react-redux';
import ErrorBoundary from 'src/config/error/error-boundary';
import { translate } from 'src/shared/utils/translation';

interface IProps extends RouteProps {
    permisions?: any[];
}

interface IPrivateRouteProps extends IProps, StateProps{}

export const PrivateRoute = ({
    component: Component,
    permisions = [],
    isAuthenticated,
    isAuthorized,
    ...rest
}: IPrivateRouteProps) => {
    const checkAuthorities = props => 
        isAuthorized ? (
            <ErrorBoundary>
                <Component {...props} />
            </ErrorBoundary>
        ) : (
            <div className="insufficient-authority">
                <div className="alert alert-danger">
                    {translate("error.http.403")}
                </div>
            </div>
        );
    const renderRedirect = props => {
        return isAuthenticated ? (checkAuthorities(props)) : (
            <Redirect to={{
                pathname: '/login',
                search: props.location.search,
                state: {from: props.location}
            }}/>
        )
    }
    if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

    return <Route {...rest} render={renderRedirect} />;
}

const checkAuthorization = (authorities, authToCheck) => {
    if (authorities && authorities.length > 0) {
        if (authToCheck.length === 0) {
            return true;
        }
        return authToCheck.some(auth => authorities.includes(auth));
    }
    return false;
} 

const mapStateToProps = ({ auth }: IRootState, { permisions = [] }: IProps) => ({
    isAuthenticated: auth.isAuthenticated,
    isAuthorized: checkAuthorization(auth.user.permisions, permisions) 
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
    mapStateToProps,
    null,
    null,
    {pure: false}
)(PrivateRoute)
