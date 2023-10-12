const TABLA = {
    name: 'Paraderos',
    pk: 'id_paradero',
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
        const pardero = {
            nombre_paradero: body.nombre_paradero,
            latitud: body.latitud,
            longitud: body.longitud,
            cc_administrador: body.cc_administrador,
        };

        if (body.accion == 'insert' && (!pardero.nombre_paradero || !pardero.latitud || !pardero.longitud || !pardero.cc_administrador)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_paradero) {
            pardero.id_paradero = body.id_paradero;
        }

        const response = await store.upsert(TABLA, pardero, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del paradero');
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