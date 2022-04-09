const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                $regex: name
                };
            }

        return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
        },
        // user: async (parent, args, context) => {

        //       const user = await User.find();

        //       return user;
        // },
        user: async (parent, args, context) => {
            // console.log(context.user._id);
            if (context.user) {
    
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
            //console.log(user);
              //user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return user;
            }
      
            throw new AuthenticationError('Not logged in');
          },
          order: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              return user.orders.id(_id);
            }     
            throw new AuthenticationError('Not logged in');
          },
    },
    
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
          },

        addOrder: async (parent, { products }, context) => {
            console.log(products);
            if (context.user) {
              let order = await Order.create({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } }, { new: true });
            
              order = await order.populate('products').execPopulate();

              return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          }
    }
  };

module.exports = resolvers;