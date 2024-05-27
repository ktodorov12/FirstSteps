module.exports = {
    home: (req, res) => {
        res.render("index",  { title: "NodeJs Blog", description: "Simple Blog with Node" })
    }
}