export var tree;

export function createFileTree(key: string) {
    tree = {};
    const fl = [
        require('../../../i18n/' + key + '/app.json'),
        require('../../../i18n/' + key + '/user.json'),
        require('../../../i18n/' + key + '/entity.json'),
        require('../../../i18n/' + key + '/login.json')
    ];
    const l = fl.length;
    for(let i = 0; i < l; i++) {
        const fd = fl[i];
        tree = {
            ...tree,
            ...fd
        } 
    }
}