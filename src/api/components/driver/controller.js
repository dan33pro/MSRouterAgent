const TABLA = {
    name: 'Conductores',
    pk: 'cc_conductor',
};

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../tools/store/mysql');
    }
    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const conductor = {
            cc_conductor: body.cc_conductor,
            nombre_conductor: body.nombre_conductor,
            apellido_conductor: body.apellido_conductor,
            placa_bus: body.placa_bus,
            cc_administrador: body.cc_administrador,
        };
        if (!conductor.cc_conductor || !conductor.nombre_conductor || !conductor.apellido_conductor ||  !conductor.placa_bus || !conductor.cc_administrador) {
            return Promise.reject('No se indico la información necesaria');
        }
        const response = await store.upsert(TABLA, conductor, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico la cedula del conductor');
        }
        return store.remove(TABLA, id);
    }

    function findByquery(key, value) {
        let query = {};
        query[key] = value;
        return store.query(TABLA, query);
    }

    return {
        list,
        get,
        upsert,
        remove,
        findByquery,
    };
};