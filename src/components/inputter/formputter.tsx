import React, { ReactNodeArray } from 'react';
import { Inputter, InputterError } from './inputter';

interface IFormputterProps {
  disabled?: boolean;
  model?: any;
  submitText?: string;
  onErrors?: (errors: InputterError[]) => void;
  onSubmit?: (data, event) => void;
}

export class Formputter extends React.Component<IFormputterProps> {
  static defaultProps: IFormputterProps;
  inputters: Inputter[];
  constructor(props){
    super(props);
    this.validate = this.validate.bind(this);
    this.inputters = []
  }

  handleInputs(children: any, disabled: boolean): ReactNodeArray {
    return React.Children.map(children, (child, index) => {
      const isCorrectType = child.type === 'button' || (child.type && child.type.displayName === 'Inputter');
      const hasProps = verifyObject(child.props);
      const shouldSearch = !isCorrectType && hasProps && (verifyArray(child.props.children) || verifyObject(child.props.children));
      if(React.isValidElement<any>(child)) {
        return React.cloneElement(child, hasProps ? {
          children: shouldSearch ? this.handleInputs(child.props.children, disabled) : child.props.children,
          disabled: isCorrectType ? disabled : undefined,
          ref: isCorrectType ? el => this.inputters.push(el) : undefined
        }: undefined)
      } else {
        return child;
      }
    });
  }

  // FIXME: find way to not lose ref when a child state is changed
  validate() {
    const errors = [];
    const shouldReturn = this.props.onErrors !== undefined;
    for (const inputter of this.inputters) {
      const result = inputter.validate();
      if(shouldReturn && result !== undefined) {
        errors.push(result);
      }
    }
    if(shouldReturn) this.props.onErrors(errors);
  }

  render(){
    const { children, disabled, submitText } = this.props;
    const reChildren = this.handleInputs(children, disabled);
    return(
      <div id="formputter">
        <div>
          {reChildren}
        </div>
        <button id="formputter-submit" className="formputter-submit" onClick={this.validate}>
          {submitText}
        </button>
      </div>
      
    );
  }
}

Formputter.defaultProps = {
  disabled: false,
  onSubmit: undefined,
  submitText: 'Submit'
}

function verifyArray(d: Array<any>): boolean {
  return verifyObject(d) && d.length > 0;
}

function verifyObject(d: Object): boolean {
  return d !== undefined && d !== null;
}

function verifyString(d: string) {
  return verifyObject(d) && d !== '' && !d.match(/\s*/g);
}