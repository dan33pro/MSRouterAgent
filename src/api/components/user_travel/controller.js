const TABLA = {
    name: 'Viajes',
    pk: 'id_viaje',
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
        const viaje = {
            origen: body.origen,
            destino: body.destino,
            cc_ciudadano: body.cc_ciudadano,
        };
        if ( body.fecha_planificacion ) {
            viaje.fecha_planificacion = body.fecha_planificacion;
        }

        if (body.accion == 'insert' && (!viaje.origen || !viaje.destino || !viaje.cc_ciudadano)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_viaje) {
            viaje.id_viaje = body.id_viaje;
        }

        const response = await store.upsert(TABLA, viaje, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del viaje planificado');
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