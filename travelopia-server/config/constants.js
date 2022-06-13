const models = require("../models");


const constantsObjFn = (async() => {
    const cTypes = await models.c_types.findAll({
        include: [{
            model: models.c_type_defs,
            attributes: [
                ['name', 'group_name']
            ]
        }],
        attributes: [
            ['name', 'constant_name'],
            'local_id'
        ],
        raw: true
    });
    const constantsObj = {};
    
    for(let key in cTypes) {
        const { 'c_type_def.group_name': group_name, constant_name, local_id } = cTypes[key];
    
        if(!(group_name in constantsObj)) {
            constantsObj[group_name] = {};
        }
        constantsObj[group_name][constant_name] = local_id;
    }
    return constantsObj;

})();
module.exports = constantsObjFn;

