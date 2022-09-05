// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'

});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  //define third table needed to store foreign keys
  through: {
    model: ProductTag  //ProductTag has a fk for both product and tag models
  },
  as: 'related_products' //define an alias for when data is retrieved
});

// // Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  //define third table needed to store foreign keys
  through: {
    model: ProductTag  //ProductTag has a fk for both product and tag models
  },
  as: 'related_products' //define an alias for when data is retrieved
});

// Product.belongsToMany(Tag, {
//   through: ProductTag,
//   as: 'related_products',
//   foreignKey: 'product_id'

// });

// Tag.belongsToMany(Product, {
//   through: ProductTag,
//   as: 'related_products',
//   foreignKey: 'tag_id'

// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
