export var tree;

export function createFileTree(key: string) {
    tree = {};
    const fl = [
        require('../../../i18n/' + key + '/app.json'),
        // Demo translation file, remove in prod
        require('../../../i18n/' + key + '/demo.json')
        // -------------------------------------
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