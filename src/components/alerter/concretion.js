export function warning (message, timeout, clickFn) {
    const alerterDiv = getAlerterDiv();
    if(!alerterDiv) {
        throw new Error('No alerter component found. Please add the Alerter component to your application component to use this function.')
    } else {
       showAlert(alerterDiv, message, timeout, clickFn, 1);
    }
}

export function error (message, timeout, clickFn) {
    const alerterDiv = getAlerterDiv();
    if(!alerterDiv) {
        throw new Error('No alerter component found. Please add the Alerter component to your application component to use this function.')
    } else {
       showAlert(alerterDiv, message, timeout, clickFn, 2);
    }
}

export function info (message, timeout, clickFn) {
    const alerterDiv = getAlerterDiv();
    if(!alerterDiv) {
        throw new Error('No alerter component found. Please add the Alerter component to your application component to use this function.')
    } else {
       showAlert(alerterDiv, message, timeout, clickFn, 3);
    }
}

export function success (message, timeout, clickFn) {
    const alerterDiv = getAlerterDiv();
    if(!alerterDiv) {
        throw new Error('No alerter component found. Please add the Alerter component to your application component to use this function.')
    } else {
       showAlert(alerterDiv, message, timeout, clickFn, 4);
    }
}

export function neutral (message, timeout, clickFn) {
    const alerterDiv = getAlerterDiv();
    if(!alerterDiv) {
        throw new Error('No alerter component found. Please add the Alerter component to your application component to use this function.')
    } else {
       showAlert(alerterDiv, message, timeout, clickFn, 0);
    }
}

export function isAlerterConfigured() {
    return getAlerterDiv() !== undefined;
}

export function custom (message, timeout, className, clickFn) {
    const alerterDiv = getAlerterDiv();
    if(!alerterDiv) {
        throw new Error('No alerter component found. Please add the Alerter component to your application component to use this function.')
    } else {
       showAlert(alerterDiv, message, timeout, clickFn, 5, className);
    }
}

function showAlert(alerter, message, timeout, clickFn, type, className) {
    const div = document.createElement('div');
    div.innerHTML = message;
    const baseClass = 'alerter-base ';
    switch (type) {
        case 1:
            div.className = baseClass + 'alerter-warning';
            break;
        case 2:
            div.className = baseClass + 'alerter-error';
            break;
        case 3:
            div.className = baseClass + 'alerter-info';
            break;
        case 4:
            div.className = baseClass + 'alerter-success';
            break;
        case 5:
            div.className = baseClass + className;
            break;
        case 0:
        default:
            div.className = baseClass + 'alerter';
            break;
    }
    alerter.style.display = 'block';
    div.style.opacity = '1';
    div.style.display = 'block';
    alerter.appendChild(div);
    if(clickFn) {
        div.onclick = clickFn;
        div.style.cursor = 'pointer';
    }
    setTimeout(() => {
        div.style.opacity = '0';
       setTimeout(() => {
        div.innerHTML = null;
        div.onclick = null;
        alerter.removeChild(div);
        if(alerter.children.length < 1) {
            alerter.style.display = 'none';
        }
       }, 500)
    }, timeout);
}

function getAlerterDiv() {
    return document.getElementById('alerter-container');
}