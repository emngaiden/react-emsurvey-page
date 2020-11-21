import React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps, Link } from 'react-router-dom';
import { translate } from 'src/shared/utils/translation/translation';

class Start extends React.Component {

    render() {
        return (
            <div>
                {translate('app.start.title')}
                <br />
                <Link to={`/demo`} className="link">
                    {translate('app.start.gotoDemo')}
                </Link>
          </div>
        );
    }
}

export default Start;