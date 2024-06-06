const express = require("express");
const authRoute = express.Router();
const {
  signup,
  login,
  accessUser,
  logout,
  adminLogin,
  adminFullDataFromDB,
  userFullDataFromDB
} = require("../controller/userAuth");
const { verifyToken, verifyAdminToken } = require("../middleware/common");

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/user/check", verifyToken, accessUser);
authRoute.post("/admin/login", adminLogin);
authRoute.get("/admin/check", verifyAdminToken, accessUser);
authRoute.get("/logout", logout);
authRoute.get("/admin/profiledata", verifyAdminToken, adminFullDataFromDB);  //
authRoute.get("/user/profiledata", verifyToken, userFullDataFromDB);  //

module.exports = authRoute;
