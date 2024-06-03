const { Router } = require("express");
const { admin, postAdmin, register, adminCookieMiddleware, dashboardView, addPostView, addPost, editPost, editPostView, deletePost, adminLogout } = require("../../controllers/admin");

const adminRouter = Router();

adminRouter.route("/admin")
    .get(adminCookieMiddleware, admin)
    .post(adminCookieMiddleware, postAdmin)

adminRouter.route("/add-post")
    .get(adminCookieMiddleware, addPostView)
    .post(adminCookieMiddleware, addPost);

adminRouter.route("/edit-post/:id")
    .get(editPostView)
    .put(editPost)

adminRouter.post("/register", register);
adminRouter.get("/dashboard", dashboardView);
adminRouter.get("/logout", adminLogout)
adminRouter.delete("/delete-post/:id", adminCookieMiddleware, deletePost)

module.exports = adminRouter;
