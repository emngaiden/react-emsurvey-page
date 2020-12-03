import React, {  ReactElement } from 'react';
import { PutterValidator } from './validator';
import './style.css';

export interface IInputterProps {
  type: 'text'|'check'|'select'|'radio'|'custom'|'password';
  disabled?: boolean;
  value?: any;
  name?: string;
  id?: any;
  static?: boolean;
  customInput?: ReactElement;
  inputClassName?: string;
  textClassName?: string;
  selectItemClassName?: string;
  selectableOptions?: SelectOption[];
  validators?: PutterValidator[];
  onChange?: (event) => void,
}

export interface InputterError {
  id: any;
  name?: string;
  value: any;
  message: string;
}

interface SelectOption {
  id: string;
  key: string;
  value: any;
  name: string;
  label?: string;
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
    const {
      type,
      disabled,
      value,
      name,
      onChange,
      id,
      selectableOptions,
      inputClassName,
      textClassName,
      selectItemClassName,
      customInput
    } = this.props;
    const { invalid, message } = this.state;
    const className = `inputter${invalid ? ' inputter-invalid' : ''}`
    switch(type) {
      case 'text': 
        return (
          <div className={className} id={id}>
            <input className={inputClassName} onBlur={this.validate} ref={el => this.inputRef = el} id={id + '-inputter-input'} value={value} name={name} disabled={disabled} type='text' onChange={onChange} />
            {invalid && <div className={'inputter-error-message' + (textClassName!== undefined ? ' ' + textClassName : '')}>{message}</div>}
          </div>
        );
      case 'select':
        return (
          <div className={className} id={id + '-inputter-wrapper'}>
            <select ref={el => this.inputRef = el} id={id + '-inputter-input'} value={value} name={name} disabled={disabled} onChange={onChange}>
              {selectableOptions.map(selectOption => (
                <option className={selectItemClassName} id={selectOption.id} value={selectOption.value} key={selectOption.key}>{selectOption.name}</option>
              ))}
            </select>
            {invalid && <div className={'inputter-error-message' + (textClassName!== undefined ? ' ' + textClassName : '')}>{message}</div>}
          </div>
        );
      case 'custom':
        return (
          <div className={className} id={id + '-inputter-wrapper'}>
            {customInput}
            {invalid && <div className={'inputter-error-message' + (textClassName!== undefined ? ' ' + textClassName : '')}>{message}</div>}
          </div>
        );
      case 'password': 
          return (
            <div className={className} id={id}>
              <input className={inputClassName} onBlur={this.validate} ref={el => this.inputRef = el} id={id + '-inputter-input'} value={value} name={name} disabled={disabled} type='password' onChange={onChange} />
              {invalid && <div className={'inputter-error-message' + (textClassName!== undefined ? ' ' + textClassName : '')}>{message}</div>}
            </div>
          );
      case 'check':
        return(
          <div className={className} id={id}>
            <input className={inputClassName} ref={el => this.inputRef = el} id={id + '-inputter-input'} checked={value} name={name} disabled={disabled} type='checkbox' onChange={onChange} />
            {invalid && <div className={'inputter-error-message' + (textClassName!== undefined ? ' ' + textClassName : '')}>{message}</div>}
          </div>
        );
      case 'radio':
        return(
          <div className={className} id={id}>
            <table className="center-table">
              <tbody>
                {selectableOptions.map((d, i) => (
                  <tr key={name + '_' + i}>
                    <td>
                      <input className={inputClassName} style={{width: '1em'}} type="radio" value={d.value} id={id + '_' + d.id} name={name} key={id + '_' + d.key} disabled={disabled} onChange={onChange} />
                    </td>
                    <td>
                      {d.label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {invalid && <div className={'inputter-error-message' + (textClassName!== undefined ? ' ' + textClassName : '')}>{message}</div>}
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
  name: 'inputter',
  selectableOptions: [],
  static: false
};
