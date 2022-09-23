import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

const createNewProduct = asyncHandler(async (req, res, next) => {
  console.log("prod");
  const { name, image, category, price, description, stock } = req.body;

  const findProduct = await Product.find({ name: name }).lean().exec();
  console.log(findProduct);

  if (findProduct.length > 0) {
    res.status(201).json({
      message: "Already exists",
    });
  } else {
    const newProduct = new Product({
      name: name,
      image: image,
      category: category,
      price: price,
      description: description,
      stock: stock,
    });

    await newProduct.save();

    res.status(200).json({
      success: true,
      message: "New product has been listed",
    });
  }

  return res.status(200);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, category, price, description, stock } = req.body;

  //const product = await Product.find(req.params.id)
  const product = await Product.find({ name: name }).lean().exec();
  console.log(product);

  if (product.length > 0) {
    const updateDoc = {
      $set: {
        name: name,
        image: image,
        category: category,
        price: price,
        description: description,
        stock: stock,
      },
    };
    const updatedProduct = await Product.updateOne({ name: name }, updateDoc);
    res.status(201).json(updatedProduct);
  } else {
    console.log();
    res.status(404);
    throw new Error("Product not found");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({}).lean().exec();

  res.status(200).json(allProducts);
});

const deleteProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const product = await Product.find({ name: req.body.name }).lean().exec();
  console.log(product);

  await Product.remove({ name: req.body.name }).lean().exec();

  return res.status(200).json({ message: "Successfully Deleted product" });
});

export { createNewProduct, updateProduct, getAllProducts, deleteProduct };
