const Post = require("../../models/Post");
module.exports = {
    Query: {
        sayHi: () => 'Hello World!',
        async getPosts() { try { return await Post.find().lean() } catch (error) { throw new Error(error) } }
    }
}