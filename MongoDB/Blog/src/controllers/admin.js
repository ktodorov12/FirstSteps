const User = require("../models/User");
const adminLayout = "../views/layouts/admin";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  admin: (req, res) => {
    try {
      const locals = {
        title: "Admin",
        description: "Simple Blog",
      };

      res.render("admin/index", { locals, layout: adminLayout });
    } catch (error) {
      console.log(error);
    }
  },
  postAdmin: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("admin/dashboard");
  },
  register: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User in use" });
      }
      res.json({ error });
    }
  },
  dashboardView: async (req, res) => {
    try {
      const data = await Post.find();
      res.render("admin/dashboard", { data, layout: adminLayout });
    } catch (error) {
      console.log(error);
    }
  },
  adminCookieMiddleware: (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "NO" });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "NO" });
    }
  },
  addPostView: (req, res) => {
    res.render("admin/add-post", { layout: adminLayout });
  },
  addPost: async (req, res) => {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.title,
    });
    res.redirect("/dasboard");
  },
  editPost: async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit-post/${req.params.id}`);
  },
  editPostView: async (req, res) => {
    const data = await Post.findById(req.res.id);
    res.render("admin/edit-post", { data, layout: adminLayout });
  },
  adminLogout: (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
  },
  deletePost: async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  },
};
