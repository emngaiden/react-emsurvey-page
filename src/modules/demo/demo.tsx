import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/shared/reducers';
import { decreaseData, increaseData, reset, requestApi, readAppSettings, readDefaultLanguage, readLanguages, switchLocale } from './demo.reducer';
import { translate } from 'src/shared/utils/translation/translation';

interface IDemoProps extends StateProps, DispatchProps{}

class Demo extends React.Component<IDemoProps> {
    render() {
        return(
            <div>
                <div>
                    <h1>
                        {translate('demo.helloWorld', { n: this.props.data, lname: this.props.language })}
                    </h1>
                    <button onClick={this.props.increaseData}>
                        {translate('demo.increase')}
                    </button>
                    <button onClick={this.props.decreaseData}>
                        {translate('demo.decrease')}
                    </button>
                    <button onClick={this.props.reset}>
                        {translate('demo.reset')}
                    </button>
                    <button onClick={this.props.requestApi}>
                        {translate('demo.callApi')}
                    </button>
                    <button onClick={this.props.readAppSettings}>
                        {translate('demo.mainApi')}
                    </button>
                    <button onClick={this.props.readLanguages}>
                        {translate('demo.languages')}
                    </button>
                    <button onClick={this.props.readDefaultLanguage}>
                        {translate('demo.defaultLanguage')}
                    </button>
                    <button onClick={this.props.switchLocale}>
                        {translate('demo.switchLanguage')}
                    </button>
                </div>
                <div>
                    {this.props.loading && ('Loading')}
                    {this.props.apiData !== undefined && <div>DATA FROM API: {this.props.apiData.toString()}</div>}
                    {this.props.error !== undefined && <div>ERROR:{this.props.error.toString()}</div>}
                    {this.props.appSettings !== undefined ? (
                        <div>
                            MAIN API
                            <pre>
                                Name: {this.props.appSettings.name}
                                <br />
                                Url: {this.props.appSettings.url}
                            </pre>
                        </div>
                    ) : (<></>)}
                    {this.props.defaultLanguage !== undefined ? (
                        <div>
                            DEFAULT LANGUAGE:
                            <pre>
                                Language key: {this.props.defaultLanguage.key}
                                <br />
                                Language name: {this.props.defaultLanguage.name}
                            </pre>
                        </div>
                    ): (<></>)}
                    {this.props.languages !== undefined && this.props.languages.length > 0? (
                        <div>
                            LANGUAGES:
                            {this.props.languages.map(element => (
                                <pre key={element.key}>
                                    Language key: {element.key}
                                    <br />
                                    Language name: {element.name}
                                </pre>
                            ))}
                        </div>
                    ): (<></>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    data: state.demo.data,
    apiData: state.demo.apiData,
    loading: state.demo.loading,
    error: state.demo.error,
    appSettings: state.demo.apiSettingsData,
    languages: state.demo.languages,
    defaultLanguage: state.demo.defaultLanguage,
    language: state.locale.languageName
});

const mapDispatchToProps = {
    decreaseData,
    increaseData,
    reset,
    requestApi,
    readAppSettings,
    readDefaultLanguage,
    readLanguages,
    switchLocale
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Demo);