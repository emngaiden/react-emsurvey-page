import React from 'react';
import * as StateDivComponent from 'src/components/state-div';
import * as InputterComponent from 'src/components/inputter';

interface ITestState {
    stateDivProps: StateDivComponent.IStateDivProps;
    inputterProps: InputterComponent.IInputterProps;

}

export default class Test extends React.Component<undefined, ITestState>{
    //#region [Ref declaration]
    inputterRef;
    stateDivRef;
    //#endregion
    constructor(props){
        super(props);
        this.state = {
            stateDivProps: {
                state: undefined
            },
            inputterProps: {
                type: 'check',
                selectableOptions: []
            }
        }
        //#region [Bindings]
        this.stateDiv_prop_state_error = this.stateDiv_prop_state_error.bind(this);
        this.stateDiv_prop_state_success = this.stateDiv_prop_state_success.bind(this);
        this.stateDiv_prop_state_undefined = this.stateDiv_prop_state_undefined.bind(this);
        this.stateDiv_prop_state_warning = this.stateDiv_prop_state_warning.bind(this);
        this.inputter_prop_type_check = this.inputter_prop_type_check.bind(this);
        this.inputter_prop_type_text = this.inputter_prop_type_text.bind(this);
        this.inputter_prop_type_select = this.inputter_prop_type_select.bind(this);
        this.inputter_prop_type_radio = this.inputter_prop_type_radio.bind(this);
        this.inputter_prop_type_custom = this.inputter_prop_type_custom.bind(this);
        this.inputter_prop_type_password = this.inputter_prop_type_password.bind(this);
        this.add_inputter_prop_selectableOptions = this.add_inputter_prop_selectableOptions.bind(this);
        this.inputter_state_makeInvalid = this.inputter_state_makeInvalid.bind(this);
        this.inputter_state_makeValid = this.inputter_state_makeValid.bind(this);
        //#endregion
        //#region [Ref init]
        this.inputterRef = React.createRef<InputterComponent.Inputter>();
        this.stateDivRef = React.createRef<StateDivComponent.StateDiv>();
        //#endregion
    }

    //#region [State methods]
    stateDiv_prop_state_undefined() {
        this.setState({
            ...this.state,
            stateDivProps: {
                ...this.state.stateDivProps,
                state: undefined
            }
        });
    }
    stateDiv_prop_state_success() {
        this.setState({
            ...this.state,
            stateDivProps: {
                ...this.state.stateDivProps,
                state: 'success'
            }
        });
    }
    stateDiv_prop_state_error() {
        this.setState({
            ...this.state,
            stateDivProps: {
                ...this.state.stateDivProps,
                state: 'error'
            }
        });
    }
    stateDiv_prop_state_warning() {
        this.setState({
            ...this.state,
            stateDivProps: {
                ...this.state.stateDivProps,
                state: 'warning'
            }
        });
    }
    inputter_prop_type_check() {
        this.setState({
            ...this.state,
            inputterProps: {
                ...this.state.inputterProps,
                selectableOptions: [],
                type: 'check'
            }
        });
    }
    inputter_prop_type_text() {
        this.setState({
            ...this.state,
            inputterProps: {
                ...this.state.inputterProps,
                selectableOptions: [],
                type: 'text'
            }
        });
    }
    inputter_prop_type_select() {
        this.setState({
            ...this.state,
            inputterProps: {
                ...this.state.inputterProps,
                selectableOptions: [],
                type: 'select'
            }
        });
    }
    inputter_prop_type_radio() {
        this.setState({
            ...this.state,
            inputterProps: {
                ...this.state.inputterProps,
                selectableOptions: [],
                type: 'radio'
            }
        });
    }
    inputter_prop_type_custom() {
        this.setState({
            ...this.state,
            inputterProps: {
                ...this.state.inputterProps,
                selectableOptions: [],
                customInput: <input type='date' />,
                type: 'custom'
            }
        });
    }
    inputter_prop_type_password() {
        this.setState({
            ...this.state,
            inputterProps: {
                ...this.state.inputterProps,
                selectableOptions: [],
                type: 'password'
            }
        });
    }
    add_inputter_prop_selectableOptions() {
        const newOptions = Array.from(this.state.inputterProps.selectableOptions);
        const d = newOptions.length;
        newOptions.push({
            id: d.toString(),
            key: d.toString(),
            name: d.toString(),
            value: d,
            label: d.toString()
        });
        this.setState({
            ...this.state,
            inputterProps: {
                ...this.state.inputterProps,
                selectableOptions: newOptions
            }
        });
    }
    inputter_state_makeInvalid() {
        this.inputterRef.updater.enqueueSetState(this.inputterRef, {...this.inputterRef.state, invalid: true, message: 'this is invalid'})
    }
    inputter_state_makeValid() {
        this.inputterRef.updater.enqueueSetState(this.inputterRef, {...this.inputterRef.state, invalid: false, message: undefined})
    }
    //#endregion

    render(){
        return(
            <div>
                <h1>Test page</h1>
                <div>
                    <h2>
                        Test StateDiv
                    </h2>
                    <div>
                        <button onClick={this.stateDiv_prop_state_undefined}>
                            state to undefined
                        </button>
                        <button onClick={this.stateDiv_prop_state_success}>
                            state to success
                        </button>
                        <button onClick={this.stateDiv_prop_state_error}>
                            state to error
                        </button>
                        <button onClick={this.stateDiv_prop_state_warning}>
                            state to warning
                        </button>
                    </div>
                    <StateDivComponent.StateDiv ref={el => this.stateDivRef = el} state={this.state.stateDivProps.state}>
                        Hello World <br />
                        Foo Bar
                    </StateDivComponent.StateDiv>
                </div>
                <div>
                    <h2>
                        Test Inputter
                    </h2>
                    <div>
                        <button onClick={this.inputter_prop_type_check}>
                            type to check
                        </button>
                        <button onClick={this.inputter_prop_type_text}>
                            type to text
                        </button>
                        <button onClick={this.inputter_prop_type_select}>
                            type to select
                        </button>
                        <button onClick={this.inputter_prop_type_radio}>
                            type to radio
                        </button>
                        <button onClick={this.inputter_prop_type_custom}>
                            type to custom
                        </button>
                        <button onClick={this.inputter_prop_type_password}>
                            type to password
                        </button>
                        <button onClick={this.add_inputter_prop_selectableOptions}>
                            add option
                        </button>
                        <button onClick={this.inputter_state_makeInvalid}>
                            make invalid
                        </button>
                        <button onClick={this.inputter_state_makeValid}>
                            make valid
                        </button>
                    </div>
                    
                    <InputterComponent.Inputter {...this.state.inputterProps} ref={el => this.inputterRef = el}/>
                </div>
            </div>
        );
    }
}