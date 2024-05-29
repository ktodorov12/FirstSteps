const Post = require("../models/Post");

module.exports = {
  getAllData: async () => {
    try {
      return await Post.find({});
    } catch (error) {
      console.log(error);
    }
  },
  dataPagination: async (query) => {
    let perPage = 5;
    let page = query || 1;

    
    try {
        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
        
      const count = await Post.countDocuments();
      const nextPage = Number(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);

      return {
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
      };
    } catch (error) {
        console.log(error);
    }
  },
};
