import { isPromise } from 'src/shared/utils/app';

export default () => next => action => {
    if(!isPromise) {
        return next(action);
    }
    return next(action)
        .then(response => {
            return Promise.resolve(response);
        })
        .catch(error => {
            if (action.meta && action.meta.errorMessage) {
                // Here we place a toast to display the error message on action.meta.errorMessage
            } else if (error & error.response) {
                const response = error.response;
                const data = response.data;
                if (!(response.status === 401)) {
                    let i;
                    // display an alert for each of this cases depending on the code
                    switch (response.status) {
                        case 0: 
                            // Cannot reach server
                            break;
                        case 400:
                            // Bad request
                            break;
                        default:
                            // Default error
                    }
                }
            } else if (error && error.message) {
                // Here we place a toast to display the error message on error.message
            } else {
                // Toast to indicate a unknown error
            }
            return Promise.reject(error);
        })
};