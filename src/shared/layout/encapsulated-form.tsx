import React, { ReactNode, ReactNodeArray } from 'react';
import { translate } from 'src/shared/utils/translation';
import { verifyArray, verifyObject } from 'src/shared/utils/app';


export interface IEncapsulatedFromProps {
    disabled?: boolean;
    independent?: boolean;
    useBuiltInSubmitAction?: boolean;
    data?: any;
    onSubmit?: (data: any, event) => void; 
}

class EncapsulatedForm extends React.Component<IEncapsulatedFromProps> {
    static defaultProps: IEncapsulatedFromProps;
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDisabledChildren(children, disabled: boolean): ReactNodeArray {
        return React.Children.map(children, (child, index) =>{
            const type = child.type;
            const isCorrectType = type === 'input' || type === 'select' || type === 'textarea' || type === 'button';
            const shouldSearch = !isCorrectType && verifyObject(child.props) && (verifyArray(child.props.children) || verifyObject(child.props.children));
            const hasProps = verifyObject(child.props);
            if(React.isValidElement<any>(child)) {
                return React.cloneElement(child, hasProps ? {
                    children: shouldSearch ? this.handleDisabledChildren(child.props.children, disabled) : child.props.children,
                    disabled: isCorrectType ? disabled : undefined 
                }: undefined) ;
            } else {
                return child;
            }
        });
    }

    handleSubmit(event) {
        if(this.props.onSubmit !== undefined) {
            this.props.onSubmit(this.props.data, event);
        }
        if(!this.props.useBuiltInSubmitAction) event.preventDefault();
    }

    render() {
        if(this.props.independent) {
            return (
                <form onSubmit={this.props.useBuiltInSubmitAction ? event => this.props.onSubmit(this.state, event) : undefined}>
                    {this.handleDisabledChildren(this.props.children, this.props.disabled)}
                    {this.props.useBuiltInSubmitAction ? <input disabled={this.props.disabled} type="submit" value={translate('app.accept')} /> : <button disabled={this.props.disabled} onClick={this.handleSubmit}>{translate('app.accept')}</button>}
                    
                </form>);
        } else {
            return this.handleDisabledChildren(this.props.children, this.props.disabled);
        }
    }
}

EncapsulatedForm.defaultProps = {
    disabled: false,
    independent: false,
    useBuiltInSubmitAction: false,
    onSubmit: undefined
}

export default EncapsulatedForm;