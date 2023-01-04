const Router = require("koa-router");
const {
  verifyUser,
  handlePassword,
  verifyLogin,
  verifyAuth,
} = require("../middleware/user.middleware");
const {
  register,
  login,
  avatarInfo,
} = require("../controller/user.controller");

const userRouter = new Router({ prefix: "/user" });

userRouter.post("/register", verifyUser, handlePassword, register);
userRouter.post("/login", verifyLogin, login);
userRouter.get("/:userId/avatar", avatarInfo);
userRouter.get("/test", verifyAuth, (ctx, next) => {
  ctx.body = "授权成功";
});

module.exports = userRouter;
