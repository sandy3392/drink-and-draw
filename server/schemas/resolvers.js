const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');


const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            // if (context.user) {
              const user = await User.find();
                console.log(user);
              return user;
            // }

            //return await User.find();


      
        },
    }
  };

module.exports = resolvers;