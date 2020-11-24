import React from 'react';
import { translate } from 'src/shared/utils/translation/translation';

interface ILoadingProps {
    message?: string;
}

class Loading extends React.Component<ILoadingProps> {
    static defaultProps: { message: string; };
    render() {
        return (
            <div className="loading-message" id="loading-message">
                {this.props.message}
            </div>
        );
    }
}

Loading.defaultProps = {
    message: translate('app.loading')
}

export default Loading;