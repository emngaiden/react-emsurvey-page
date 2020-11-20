import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../shared/reducers';
import { decreaseData, increaseData, reset, requestApi, readAppSettings } from '../shared/reducers/basic';
import { getApiData } from '../shared/utils/appsettings-utils';

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
                        appsettings
                    </button>
                </div>
                <div>
                    {this.props.loading && ('Loading')}
                    {this.props.apiData !== undefined && this.props.apiData.toString()}
                    {this.props.error !== undefined && this.props.error.toString()}
                    {this.props.appSettings !== undefined ? (
                        <pre>
                            Name: {this.props.appSettings.name}
                            <br />
                            Url: {this.props.appSettings.url}
                        </pre>
                    ) : (<></>)}
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
    appSettings: state.basic.apiSettingsData
});

const mapDispatchToProps = {
    decreaseData,
    increaseData,
    reset,
    requestApi,
    readAppSettings
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Start);