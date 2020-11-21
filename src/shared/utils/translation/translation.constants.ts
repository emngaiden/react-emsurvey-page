export var tree;

export function createFileTree(key: string) {
    tree = {};
    const fl = [
        require('../../../i18n/' + key + '/app.json'),
        // Demo translation file, remove in prod
        require('../../../i18n/' + key + '/demo.json')
        // -------------------------------------
    ];
    for(let i = 0; i < fl.length; i++) {
        const fd = fl[i];
        tree = {
            ...tree,
            ...fd
        } 
    }
}