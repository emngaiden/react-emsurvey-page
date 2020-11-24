import React from 'react';
import { RouteProps, Route } from 'react-router-dom';
import ErrorBoundary from './error-boundary';

export default class ErrorCatchingRoute extends React.Component<RouteProps> {

    constructor(props) {
        super(props);
        if(!this.props.component) throw new Error(`A component needs to be specified for path ${(this.props as any).path}`)
        this.encloseRoute = this.encloseRoute.bind(this);
    }

    encloseRoute(props) {
        const Component = this.props.component;
        return (
            <ErrorBoundary>
                <Component {...props}  />
            </ErrorBoundary>
        );
    }

    render() {
        const {component: Component, ...rest} = this.props;
        return <Route {...rest} render={this.encloseRoute} />
    }

}