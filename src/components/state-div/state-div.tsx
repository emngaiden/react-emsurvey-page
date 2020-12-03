import React from 'react';

interface IStateDivProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    state?: 'success' | 'error' | 'warning'
}

export class StateDiv extends React.Component<IStateDivProps> {
    render() {
        const {state, ...rest} = this.props;
        return (
            <div {...rest} className={'state-div' + (this.props.state !== undefined ? '-' + this.props.state : '')}>
                {this.props.children}
            </div>
        );

    }
}
