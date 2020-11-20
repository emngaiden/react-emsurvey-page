import React from 'react';

interface IErrorBoundaryProps {
  readonly children: JSX.Element | JSX.Element[];
}
  
interface IErrorBoundaryState {
  readonly error: any;
  readonly errorInfo: any;
}

const initialState: IErrorBoundaryState = {
  error: undefined,
  errorInfo: undefined
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error, errorInfo
    });
  }

  render(){
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails = 
        process.env.NODE_ENV === 'development' ? (
          <details className="error-details">
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : undefined;
      return (
        <div>
          <h2 className="error">
            An error has ocurred
          </h2>
          {errorDetails}
        </div>
      ); 
    }
    return this.props.children;
  }
}

export default ErrorBoundary;