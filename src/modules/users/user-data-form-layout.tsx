import React from 'react';
import { translate } from 'src/shared/utils/translation/translation';
import { IUser } from 'src/shared/model/user.model';
import { ILanguage } from 'src/shared/model/system/language.model';
import { getAvailableLanguages, getDefaultLanguage } from 'src/shared/utils/appconfig.utils';
import EncapsulatedForm, { IEncapsulatedFromProps } from 'src/shared/layout/encapsulated-form';

interface UserDataFormProps extends IEncapsulatedFromProps{
    user?: IUser;
}

const initialState = {
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    langKey: getDefaultLanguage().key
}

type UserDataFormState = typeof initialState;


class UserDataForm extends React.Component<UserDataFormProps, UserDataFormState> {
    languages: ILanguage[];
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = user !== undefined ? {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            langKey: user.langKey,
            login: user.login
        } : initialState;
        this.languages = getAvailableLanguages();
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(event) {
        const nState = {...this.state};
        const name = event.target.name;
        nState[name] = event.target.value;
        this.setState(nState);
    }

    render() {
        const { email, firstName, langKey, lastName, login } = this.state;
        return (
            <EncapsulatedForm independent onSubmit={this.props.onSubmit} data={this.state} disabled={this.props.disabled}>
                <table>
                    <thead>
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.firstName')}
                            </td>
                            <td colSpan={2}>
                                <input type="text" id="user-form_first-name" name="firstName" value={firstName} onChange={this.onValueChanged}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.lastName')}
                            </td>
                            <td colSpan={2}>
                                <input type="text" id="user-form_last-name" name="lastName" value={lastName} onChange={this.onValueChanged}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.login')}
                            </td>
                            <td colSpan={2}>
                                <input type="text" id="user-form_login" name="login" value={login} onChange={this.onValueChanged}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.email')}
                            </td>
                            <td colSpan={2}>
                                <input type="text" id="user-form_email  " name="email" value={email} onChange={this.onValueChanged}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.language')}
                            </td>
                            <td colSpan={2}>
                                <select id="user-form_lang-key" name="langKey" value={langKey} onChange={this.onValueChanged}>
                                    {this.languages.map(language =>(
                                        <option value={language.key} id={`user-form_language_${language.key}`} key={language.key}>{language.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </EncapsulatedForm>
        );
    }
}

export default UserDataForm;