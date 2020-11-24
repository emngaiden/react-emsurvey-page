import React from 'react';
import { translate } from 'src/shared/utils/translation';

interface ILoadingProps {
    message?: string;
}

class Creating extends React.Component<ILoadingProps> {
    static defaultProps: { message: string; };
    render() {
        return (
            <div className="creating-message" id="creating-message">
                {this.props.message}
            </div>
        );
    }
}

Creating.defaultProps = {
    message: translate('app.creating')
}

export default Creating;