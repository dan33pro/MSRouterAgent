const TABLA = {
    name: 'Buses',
    pk: 'placa_bus',
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
        const bus = {
            placa_bus: body.placa_bus,
            modelo: body.modelo,
            observaciones: body.observaciones,
            id_ruta: body.id_ruta,
            cc_administrador: body.cc_administrador,
        };
        if (!bus.placa_bus || !bus.modelo || !bus.observaciones ||  !bus.id_ruta || !bus.cc_administrador) {
            return Promise.reject('No se indico la información necesaria');
        }
        const response = await store.upsert(TABLA, bus, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico la placa del bus');
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