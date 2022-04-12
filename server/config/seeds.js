const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();
  
    const categories = await Category.insertMany([
      { name: 'Wine' },
      { name: 'Beer' },
      { name: 'Bourbon' },
    ]);
  
    console.log('categories seeded');
  
    await Product.deleteMany();
  
    const products = await Product.insertMany([
      {
        name: 'Date Night',
        description:
          'Date night for two made easy in three steps: 1. Choose your wine. 2. Choose your art style: drawing or painting supplies for 2 creations, instructions included. 3. Pick the night for your date!',
        image: 'Girls-Night.jpg',
        category: categories[0]._id,
        price: 40.00,
        quantity: 50
      },
      {
        name: "Girls' Night",
        description:
          "The perfect Girls' night! Choose 2 bottles of wine. Comes with canvas and painting supplies for 4. Instructions included.",
        image: 'Girls-Night.jpg',
        category: categories[0]._id,
        price: 60.00,
        quantity: 50
      },
      {
        name: 'Group Party',
        category: categories[0]._id,
        description:
          'Entertainment for a group made easy! Choose 2 bottles of wine. Comes with canvas and painting supplies for 4 people. Instructions included.',
        image: 'Cheers.jpg',
        price: 60.00,
        quantity: 50
      },
      {
        name: 'Large Party',
        category: categories[0]._id,
        description:
          'Entertainment for a group made easy! Choose 4 bottles of wine. Comes with canvas and painting supplies for 8 people. Instructions included.',
        image: 'Cheers-White-Wine.jpg',
        price: 100.00,
        quantity: 50
      }
    ]);
  
    console.log('products seeded');
  
    await User.deleteMany();
  
    await User.create({
      firstName: 'Pamela',
      lastName: 'Washington',
      email: 'pamela@testmail.com',
      password: 'password12345',
      orders: [
        {
          products: [products[0]._id, products[0]._id, products[1]._id]
        }
      ]
    });
  
    await User.create({
      firstName: 'Elijah',
      lastName: 'Holt',
      email: 'eholt@testmail.com',
      password: 'password12345'
    });
  
    console.log('users seeded');
  
    process.exit();
  });
  