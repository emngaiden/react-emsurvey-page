import React from 'react';
import { translate } from 'src/shared/utils/translation';
import { IUser } from 'src/shared/model/user.model';
import { ILanguage } from 'src/shared/model/system/language.model';
import { getAvailableLanguages, getDefaultLanguage } from 'src/shared/utils/app';
import { Inputter, Formputter, required, email as vEmail, IFormputterProps, strongPassword} from 'src/components/inputter';

interface UserDataFormProps extends IFormputterProps{
    user?: IUser;
}

const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    login: '',
    password: '',
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
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            langKey: user.langKey,
            login: user.login,
            password: initialState.password
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
        const { email, firstName, langKey, lastName, login, password } = this.state;
        const { user, ...rest } = this.props;
        return (
            <Formputter {...rest} model={{...this.state}}>
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
                                <Inputter id="user-form_first-name" type="text" value={firstName} name="firstName" onChange={this.onValueChanged} validators={[required()]}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.lastName')}
                            </td>
                            <td colSpan={2}>
                                <Inputter type="text" id="user-form_last-name" value={lastName} name="lastName" onChange={this.onValueChanged} validators={[required()]}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.login')}
                            </td>
                            <td colSpan={2}>
                                <Inputter type="text" id="user-form_login" value={login} name="login" onChange={this.onValueChanged} validators={[required()]}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {translate('user.email')}
                            </td>
                            <td colSpan={2}>
                                <Inputter type="text" id="user-form_email" value={email} name="email" onChange={this.onValueChanged} validators={[required(), vEmail()]}/>
                            </td>
                        </tr>
                        {user === undefined ?
                            (
                                <tr>
                                    <td colSpan={2}>
                                        {translate('user.password')}
                                    </td>
                                    <td colSpan={2}>
                                        <Inputter type="password" id="user-form_password" value={password} name="password" onChange={this.onValueChanged} validators={[required(), strongPassword()]}/>
                                    </td>
                                </tr>
                            ):
                            (
                                <></>
                            )
                        }
                        <tr>
                            <td colSpan={2}>
                                {translate('user.language')}
                            </td>
                            <td colSpan={2}>
                                <Inputter type="select" id="user-form_lang-key" value={langKey} name="langKey" onChange={this.onValueChanged} selectableOptions={this.languages.map(language => (
                                    {
                                        id: `user-form_language_${language.key}`,
                                        value: language.key,
                                        name: language.name,
                                        key: language.key
                                    }
                                ))}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Formputter>
        );
    }
}

export default UserDataForm;