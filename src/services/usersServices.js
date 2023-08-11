import UserDao from "../daos/mongodb/userDao.js";

const userDao = new UserDao();
export const userRegisterService = async (newUserData) => {
  try {
    const newUser = await userDao.createUser(newUserData);
    if (newUser) {
      return newUser;
    } else {
      throw new Error("Error de servicio");
    }
  } catch (error) {
    console.log(error);
  }
};

export const userLoginService = async (email, password) => {
  try {
    const userlog = await userDao.loginUser(email, password);

    if (userlog) {
      console.log("User logueado:::: " + userlog);
      return userlog;
    } else {
      throw new Error("Error de servicio");
    }
  } catch (error) {
    console.log(error);
  }
};
