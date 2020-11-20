export default () => next => action => {
    const { type, meta, payload } = action;
    console.groupCollapsed(type);
    console.log('Payload:', payload);
    console.log('Meta:', meta);
    console.groupEnd();
    return next(action);
}