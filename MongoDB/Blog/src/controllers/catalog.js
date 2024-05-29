const { dataPagination, getById } = require("../services/post");

module.exports = {
  home: async (req, res) => {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog",
    };

    const { data, current, nextPage } = await dataPagination(req.query.page);
    res.render("index", { locals, data, current, nextPage });
  },
  details: async (req, res) => {
    const data = await getById(req.params.id);
    res.render("post", { data });
  },
};
