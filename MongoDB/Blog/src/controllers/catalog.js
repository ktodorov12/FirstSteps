const { dataPagination } = require("../services/post")

module.exports = {
    home: async (req, res) => {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog"
        }

        const {data, current, nextPage} = await dataPagination(req.query.page);
        res.render("index",  { locals, data, current, nextPage })
    }
}