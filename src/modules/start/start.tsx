import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { translate } from 'src/shared/utils/translation';

export interface IStartProps extends RouteComponentProps<{ url: string }>{}

class Start extends React.Component<IStartProps> {

    render() {
        return (
            <div>
                {translate('app.start.title')} 
                <Link to={'/users'}>
                    Goto users
                </Link>
          </div>
        );
    }
}

export default Start;