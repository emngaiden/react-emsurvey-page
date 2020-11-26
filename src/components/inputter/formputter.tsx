import React, { ReactNodeArray } from 'react';
import { Inputter, InputterError } from './inputter';
import { verifyArray, verifyObject }  from './validator';

export interface IFormputterProps {
  disabled?: boolean;
  model?: any;
  submitText?: string;
  onErrors?: (errors: InputterError[]) => void;
  onSubmit?: (data, event) => void;
}

export class Formputter extends React.Component<IFormputterProps> {
  static defaultProps: IFormputterProps;
  inputRefs: Inputter[];
  firstCount: number;
  constructor(props){
    super(props);
    this.validate = this.validate.bind(this);
    this.inputRefs = undefined;
  }

  handleInputs(children: any, disabled: boolean, created = false): ReactNodeArray {
    return React.Children.map(children, (child, index) => {
      const isCorrectType = child.type === 'button' || (child.type && child.type.displayName === 'Inputter');
      const hasProps = verifyObject(child.props);
      const shouldSearch = !isCorrectType && hasProps && (verifyArray(child.props.children) || verifyObject(child.props.children));
      if(React.isValidElement<any>(child)) {
        let ref;
        if(created && isCorrectType) {
          ref = (node) => {
            if(this.firstCount === undefined) this.inputRefs.push(node);
            const { ref } = child.props;
            if(typeof ref === 'function') {
              ref(node);
            }
          };
        } else {
          ref = undefined;
        }
        const nChildren = shouldSearch ? this.handleInputs(child.props.children, disabled, created) : child.props.children;
        return React.cloneElement(child, hasProps ? {
          ...child.props,
          disabled: !child.props.static && isCorrectType ? disabled : undefined,
          ref
        }: undefined, nChildren);
      } else {
        return child;
      }
    });
  }

  validate(event) {
    const errors = [];
    const shouldReturn = this.props.onErrors !== undefined;
    for (const inputRef of this.inputRefs) {
      const res = inputRef.validate();   
      if(res !== undefined) errors.push(res);
    }
    if(shouldReturn && errors.length > 0) this.props.onErrors(errors);
    if(errors.length === 0 && this.props.onSubmit !== undefined) this.props.onSubmit(this.props.model, event); 
  }

  componentDidMount() {
    this.firstCount = this.inputRefs.length;
  }

  render(){
    const { children, disabled, submitText } = this.props;
    let created = false;
    if(this.inputRefs === undefined) {
      this.inputRefs = [];
      created = true;
    }
    const reChildren = this.handleInputs(children, disabled, created);
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