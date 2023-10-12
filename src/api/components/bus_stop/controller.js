const TABLA = {
    name: 'ParadasRutas',
    pk: 'id_parada_ruta',
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
        const parada = {
            id_tipo_parada_ruta: body.id_tipo_parada_ruta,
            id_paradero: body.id_paradero,
            id_ruta: body.id_ruta,
            cc_administrador: body.cc_administrador,
        };

        if (body.accion == 'insert' && (!parada.id_tipo_parada_ruta || !parada.id_paradero || !parada.id_ruta || !parada.cc_administrador)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_parada_ruta) {
            parada.id_parada_ruta = body.id_parada_ruta;
        }

        const response = await store.upsert(TABLA, parada, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la parada');
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