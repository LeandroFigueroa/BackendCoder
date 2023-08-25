import UserDao from "../daos/mongodb/userDao.js";

const userDao = new UserDao();
export function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).send("🚫 Acceso denegado!!!");
}
export async function isUser(req, res, next) {
  if (req.isAuthenticated() && req.user.role == "user") {
    return next();
  }
  res.status(403).send("Permiso denegado");
}
