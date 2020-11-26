import React, {  ReactElement } from 'react';
import { PutterValidator } from './validator';

interface IInputterProps {
  type: 'text'|'check'|'select'|'radio'|'custom';
  disabled?: boolean;
  value?: any;
  name?: string;
  id?: any;
  static?: boolean;
  customInput?: ReactElement;
  inputClassName?: string;
  textClassName?: string;
  containerClassName?: string;
  selectItemClassName?: string;
  selectOptions?: SelectOption[];
  validators?: PutterValidator[];
  onChange?: (event) => void,
}

export interface InputterError {
  id: any;
  name: string;
  value: any;
  message: string;
}

interface SelectOption {
  id: string;
  key: string;
  value: any;
  name: string;
}
 
interface IInputterState {
  invalid: boolean;
  message: string;
}

export class Inputter extends React.Component<IInputterProps, IInputterState> {
  static defaultProps: IInputterProps;
  inputRef: any;
  constructor(props){
    super(props);
    this.state = {
      invalid: false,
      message: undefined
    }
    this.validate = this.validate.bind(this);
  }

  validate(): InputterError {
    const { validators } = this.props;
    if(this.inputRef.disabled) return;
    if(validators === undefined) return;
    for (const validator of this.props.validators) {
      if(!validator.fn(this.props.value)) {
        this.setState({
          invalid: true,
          message: validator.message
        });
        return {
          id: this.props.id,
          name: this.props.name,
          value: this.props.value,
          message: validator.message
        };
      } else {
        this.setState({
          invalid: false,
          message: undefined
        });
      }
    }
    return undefined;
  }

  render() {
    const { type, disabled, value, name, onChange, id, selectOptions, containerClassName, inputClassName, textClassName, selectItemClassName, customInput } = this.props;
    const { invalid, message } = this.state;
    const className = `inputter${inputClassName !== undefined ? ` ${inputClassName}` : ''}${invalid ? ' inputter-invalid' : ''}`
    switch(type) {
      case 'text': 
        return (
          <div className={containerClassName} id={id}>
            <input onBlur={this.validate} ref={el => this.inputRef = el} className={className} id={id + '-inputter-input'} value={value} name={name} disabled={disabled} type='text' onChange={onChange} />
            {invalid && message}
          </div>
        );
      case 'select':
        return (
          <div className={containerClassName} id={id + '-inputter-wrapper'}>
            <select ref={el => this.inputRef = el} className={className} id={id + '-inputter-input'} value={value} name={name} disabled={disabled} onChange={onChange}>
              {selectOptions.map(selectOption => (
                <option className={selectItemClassName} id={selectOption.id} value={selectOption.value} key={selectOption.key}>{selectOption.name}</option>
              ))}
            </select>
            {invalid && message}
          </div>
        );
      case 'custom':
        return (
          <div className={containerClassName} id={id + '-inputter-wrapper'}>
            {customInput}
            {invalid && message}
          </div>
        );
      default:
        return ('invalid input type')
    }
  }
}

Inputter.defaultProps = {
  type: 'text',
  disabled: false,
  id: 'inputter',
  selectOptions: [],
  static: false
};
