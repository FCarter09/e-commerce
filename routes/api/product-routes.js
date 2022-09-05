const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    // Query configuration
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
            as: 'related_products'
        
      },
    ]
  })
  .then(productData => res.json(productData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id
    },
      // Query configuration
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: ProductTag,
            as: 'related_products'
          
        },
      ]
    })
    .then(productData => {
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id' })
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    
  {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create ({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
  })
  .then(productData => res.json(productData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// update product
router.put('/:id', (req, res) => {
  // update product data
  
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(productData => {
      if (!productData[0]) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(productData => {
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
