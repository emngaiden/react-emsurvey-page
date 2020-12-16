import React from 'react';
import './style.css';
const concretion = require('./concretion');

export class Alerter extends React.Component {
    render() {
        return(
            <div id="alerter-container" style={{ display: 'none' }} key="alerter"/>
        );
    }
}

export enum AlerterType {
    error,
    warning,
    info,
    success,
    neutral
}

export function warning(message = 'warning', timeout= 4000, clickFn?: () => void) {
    concretion.warning(message, timeout, clickFn);
}

export function error(message = 'error', timeout = 4000, clickFn?: () => void) {
    concretion.error(message, timeout, clickFn);
}

export function info(message = 'info', timeout = 4000, clickFn?: () => void) {
    concretion.info(message, timeout, clickFn);
}

export function success(message = 'success', timeout = 4000, clickFn?: () => void) {
    concretion.success(message, timeout, clickFn);
}

export function neutral(message = 'alert', timeout = 4000, clickFn?: () => void) {
    concretion.neutral(message, timeout, clickFn);
}

export function custom(className: string, message = 'my alert', timeout = 4000, clickFn?: () => void) {
    concretion.custom(message, timeout, className, clickFn);
}

export function isAlerterConfigured(): boolean {
    return concretion.isAlerterConfigured();
}