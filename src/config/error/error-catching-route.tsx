import React from 'react';
import { RouteProps, Route } from 'react-router-dom';
import ErrorBoundary from './error-boundary';

export default class ErrorCatchingRoute extends React.Component<RouteProps> {

    constructor(props) {
        super(props);
        if(!this.props.component) throw new Error(`A component needs to be specified for path ${(this.props.rest as any).path}`)
        this.encloseRoute = this.encloseRoute.bind(this);
    }

    encloseRoute() {
        const Component = this.props.component;
        return (
            <ErrorBoundary>
                <Component {...this.props}  />
            </ErrorBoundary>
        );
    }

    render() {
        return <Route {...this.props.rest} render={this.encloseRoute} />
    }

}