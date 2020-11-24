import React from 'react';
import { translate } from 'src/shared/utils/translation';

interface ILoadingProps {
    message?: string;
}

class Updating extends React.Component<ILoadingProps> {
    static defaultProps: { message: string; };
    render() {
        return (
            <div className="updating-message" id="updating-message">
                {this.props.message}
            </div>
        );
    }
}

Updating.defaultProps = {
    message: translate('app.updating')
}

export default Updating;