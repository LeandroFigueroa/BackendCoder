import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/userDao.js";
import { ClientIDGithub, ClientSecretGithub } from "../config.js";

const userDao = new UserDao();
const strategyOptions = {
  clientID: ClientIDGithub,
  clientSecret: ClientSecretGithub,
  callbackURL: "http://localhost:8080/users/github-profile",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log("profile:::", profile);
  const email =
    profile._json.email !== null ? profile._json.email : profile._json.blog;
  const user = await userDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.createUser({
    first_name: profile._json.name.split(" ")[0],
    last_name: profile._json.name.split(" ")[1],
    email,
    password: " ",
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
