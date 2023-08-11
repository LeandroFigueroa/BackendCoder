import ProductsDaoFs from "./filesystem/productsDao.js";
import CartDao from "./mongodb/cartDao.js";
import MsgManagerMongoDb from "./mongodb/messagesDao.js";
import UserDao from "./mongodb/userDao.js";
import ProductsDaoMongoDB from "./mongodb/productsDao.js";

let userManager;
let cartManager;
let msgManager;
let productsManager;

let persistence = process.argv[2];

switch (persistence) {
  case "file":
    productsManager = new ProductsDaoFs("./src/daos/filesystem/products.json");
    break;
  case "mongo":
    userManager = new UserDao();
    cartManager = new CartDao();
    msgManager = new MsgManagerMongoDb();
    productsManager = new ProductsDaoMongoDB();
    break;
  default:
    userManager = new UserDao();
    cartManager = new CartDao();
    msgManager = new MsgManagerMongoDb();
    productsManager = new ProductsDaoMongoDB();
    break;
}
export default { userManager, productsManager, msgManager, cartManager };
