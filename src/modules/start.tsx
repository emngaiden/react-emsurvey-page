import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../shared/reducers';
import { decreaseData, increaseData, reset } from '../shared/reducers/basic';

interface IStartProps extends StateProps, DispatchProps{}

class Start extends React.Component<IStartProps> {
    render() {
        return(
            <div>
                <h1>
                    hello world {this.props.data} times
                </h1>
                <button onClick={this.props.increaseData}>
                    increase
                </button>
                <button onClick={this.props.decreaseData}>
                    decrease
                </button>
                <button onClick={this.props.reset}>
                    reset
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    data: state.basic.data
});

const mapDispatchToProps = {
    decreaseData,
    increaseData,
    reset
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Start);