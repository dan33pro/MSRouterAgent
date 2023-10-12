const auth = require("../../../tools/auth");

module.exports = function checkAuth(action) {
  function middlewware(req, res, next) {
    switch (action) {
      case "admin":
        let owner = req.body.cc_ciudadano;
        auth.check.checkRol(req, owner);
        next();
        break;
      default:
        next();
    }
  }

  return middlewware;
};
