import React from 'react';
import { RouteProps, Redirect, Route } from 'react-router-dom';
import { IRootState } from 'src/shared/reducers';
import { connect } from 'react-redux';
import ErrorBoundary from 'src/config/error/error-boundary';
import { translate } from 'src/shared/utils/translation';

interface IProps extends RouteProps {
    permissions?: any[];
}

interface IPrivateRouteProps extends IProps, StateProps{}

export const PrivateRouteComponent = ({
    component: Component,
    isAuthenticated,
    isAuthorized,
    permissions = [],
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

const checkAuthorization = (user, authToCheck) => {
    if (!user) {
        return false;
    }
    const authorities = user.permissions;
    if (authorities && authorities.length > 0) {
        if (authToCheck.length === 0) {
            return true;
        }
        return authToCheck.some(auth => authorities.includes(auth));
    }
    return false;
} 

const mapStateToProps = ({ auth }: IRootState, { permissions: permisions = [] }: IProps) => ({
    isAuthenticated: auth.isAuthenticated,
    isAuthorized: checkAuthorization(auth.user, permisions) 
});

type StateProps = ReturnType<typeof mapStateToProps>;

export const PrivateRoute = connect<StateProps, undefined, IProps>(
    mapStateToProps,
    null,
    null,
    {pure: false}
)(PrivateRouteComponent);

export default PrivateRoute;
