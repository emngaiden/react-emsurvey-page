import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/shared/reducers';
import { decreaseData, increaseData, reset, requestApi, readAppSettings, readDefaultLanguage, readLanguages } from 'src/shared/reducers/basic';

interface IStartProps extends StateProps, DispatchProps{}

class Start extends React.Component<IStartProps> {
    render() {
        return(
            <div>
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
                    <button onClick={this.props.requestApi}>
                        api
                    </button>
                    <button onClick={this.props.readAppSettings}>
                        main api
                    </button>
                    <button onClick={this.props.readLanguages}>
                        languages
                    </button>
                    <button onClick={this.props.readDefaultLanguage}>
                        defaultLanguage
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
    data: state.basic.data,
    apiData: state.basic.apiData,
    loading: state.basic.loading,
    error: state.basic.error,
    appSettings: state.basic.apiSettingsData,
    languages: state.basic.languages,
    defaultLanguage: state.basic.defaultLanguage
});

const mapDispatchToProps = {
    decreaseData,
    increaseData,
    reset,
    requestApi,
    readAppSettings,
    readDefaultLanguage,
    readLanguages
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Start);