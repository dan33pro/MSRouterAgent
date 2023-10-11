const auth = require("../../../tools/auth");

module.exports = function checkAuth(action) {
  function middlewware(req, res, next) {
    switch (action) {
      case "admin":
        let idAdmin = 2;
        auth.check.checkRol(req, idAdmin);
        next();
        break;
      default:
        next();
    }
  }

  return middlewware;
};
