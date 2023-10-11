const auth = require('../auth');
const TABLA = {
    name: 'Usuarios',
    pk: 'cedula',
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

    function findByquery(key, value) {
        let query = {};
        query[key] = value;
        return store.query(TABLA, query);
    }

    async function upsert(body) {
        const user = {
            cedula: body.cedula,
            id_rol: body.id_rol,
            nombreUsuario: body.nombreUsuario,
            correoElectronico: body.correoElectronico,
            codPais: body.codPais,
            numeroCelular: body.numeroCelular,
            photo: body.photo,
        };
        if (body.accion == 'insert' && (!user.cedula || !user.id_rol || !user.nombreUsuario ||  !user.correoElectronico || !user.codPais || !user.numeroCelular || !body.userPassword)) {
            return Promise.reject('No se indico la información necesaria');
        }

        const response = await store.upsert(TABLA, user, body.accion);
        if (body.userPassword && body.cedula) {
            await auth.upsert({
                cedula: user.cedula,
                userPassword: body.userPassword,
            }, body.accion);
        }
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del usario');
        }
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
        findByquery,
    };
};