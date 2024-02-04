const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const Post = require("./models/Post");
const User = require('./models/User');
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers/index");


const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true
});

(async () => {
    await mongoose.connect(MONGODB);
    console.log(`MONGO CONNECTED!`);
    const connection = await server.listen({ port: 5000 });
    console.log(`Server is Listing on ${connection.url}`);

})();





