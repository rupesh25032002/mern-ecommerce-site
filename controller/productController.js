import slugify from "slugify";
import productModel from "../model/productModel.js";
import fs from "fs";
import braintree from "braintree";
import orderModel from "../model/OrderModel.js";

//payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "4f9xz2grm4yhwbjw",
  publicKey: "vn5c8cgxgn7gwpdc",
  privateKey: "28d38980544d5c8699bdc4841d25af6a",
});

//CREATE PRODUCT
const createProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const photo = req.file;
  try {
    if (!name)
      return res
        .status(400)
        .send({ success: false, message: "Name of product is required" });
    if (!description)
      return res.status(400).send({
        success: false,
        message: "Description of product is required",
      });
    if (!price)
      return res
        .status(400)
        .send({ success: false, message: "Price of product is required" });
    if (!quantity)
      return res
        .status(400)
        .send({ success: false, message: "Quantity of product is required" });
    if (!photo)
      return res
        .status(400)
        .send({ success: false, message: "Image is Required" });
    if (photo && photo.size > 1000000)
      return res.status(400).send({
        success: false,
        message: "Image of product size must be less than 1mb",
      });

    const existProduct = await productModel.findOne({ slug: slugify(name) });
    if (existProduct) {
      return res.status(401).send({
        success: false,
        message: "This product is already Exist",
      });
    }

    const product = await new productModel({
      ...req.body,
      photo: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: photo.mimetype,
      },
      slug: slugify(name),
    }).save();

    return res.status(201).send({
      success: true,
      message: "Product created succesfully",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//GET ALL PRODUCT
const getAllProduct = async (req, res) => {
  try {
    const allProduct = await productModel
      .find({})
      .select("-photo")
      .populate("category");

    if (allProduct.length === 0) {
      return res.status(200).send({
        success: true,
        message: "There is no product",
      });
    }
    
    await product.save();
    res.status(200).send({
      success: true,
      message: "Fetched all products",
      allProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//GET PRODUCT ON THE BASE OF PAGE
const getProductPage = async (req, res) => {
  try {
    const page = req.params.page;
    const productCount = 2;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * productCount)
      .limit(productCount)
      .populate("category");

    return res.status(200).send({
      success: true,
      message: "Product Fetched",
      products,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
//GET PRODUCT COUNT
const getProductCount = async (req, res) => {
  try {
    const totalProduct = await productModel.estimatedDocumentCount();
    return res.status(200).send({
      success: true,
      message: "Total Product count",
      totalProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//GET FILTER PRODUCT
const getFilterProduct = async (req, res) => {
  const { categoryFilter, priceFilter } = req.body;
  try {
    if (categoryFilter.length < 1 && priceFilter.length < 1) {
      return res.status(200).send({
        success: false,
      });
    }
    let arg = {};
    if (priceFilter.length > 0)
      arg.price = { $gte: priceFilter[0], $lte: priceFilter[1] };
    if (categoryFilter.length > 0) arg.category = { $in: categoryFilter };

    const filterProducts = await productModel
      .find(arg)
      .select("-photo")
      .populate("category");
    console.log(filterProducts);
    return res.status(200).send({
      success: true,
      message: "Filter Products Fetched",
      filterProducts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//GET SEARCH PRODUCT
const searchProduct = async (req, res) => {
  const { keyword } = req.body;
  try {
    const regPattern = new RegExp(keyword, "i");
    const product = await productModel
      .find({
        $or: [
          { name: { $regex: regPattern } },
          { description: { $regex: regPattern } },
        ],
      })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Search Product Fetched",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  try {
    const singleProduct = await productModel
      .findOne({ slug: slugify(req.params.slug) })
      .select("-photo")
      .populate("category");

    if (!singleProduct) {
      return res.status(401).send({
        success: false,
        message: "This Product is not available",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product is fetched",
      singleProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//SIMILAR PRODUCT
const similarProduct = async (req, res) => {
  console.log(req.params);
  try {
    const product = await productModel.findOne(
      { slug: req.params.pslug },
      { category: 1 }
    );
    console.log(product);
    const similarProduct = await productModel
      .find({ category: product.category,slug:{$ne:req.params.pslug}})
      .limit(4)
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Similar Product Fetched",
      similarProduct,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//GET PRODUCT IMAGE
const getProductImage = async (req, res) => {
  try {
    const productImage = await productModel
      .findOne({ _id: req.params.id })
      .select("photo");

    if (!productImage || !productImage.photo) {
      return res.status(404).send({
        success: false,
        message: "Image not found",
      });
    }

    res.set("Content-Type", productImage.photo.contentType);
    return res.status(200).send(productImage.photo.data);
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  const { name, description, price, quantity, shipping, category } = req.body;
  const photo = req.file;

  try {
    if (!name)
      return res
        .status(400)
        .send({ success: false, message: "Name of product is required" });
    if (!category)
      return res
        .status(400)
        .send({ success: false, message: "Category of product is required" });
    if (!description)
      return res
        .status(400)
        .send({
          success: false,
          message: "Description of product is required",
        });
    if (!price)
      return res
        .status(400)
        .send({ success: false, message: "Price of product is required" });
    if (!quantity)
      return res
        .status(400)
        .send({ success: false, message: "Quantity of product is required" });
    if (!shipping)
      return res
        .status(400)
        .send({ success: false, message: "Shipping is Required" });
    if (photo && photo.size > 1000000)
      return res
        .status(400)
        .send({
          success: false,
          message: "Image of product size must be less than 1mb",
        });

    const productToUpdate = await productModel.findById(req.params.id);

    if (!productToUpdate) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // Update other fields except the image
    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.price = price;
    productToUpdate.quantity = quantity;
    productToUpdate.shipping = shipping;
    productToUpdate.category = category;
    productToUpdate.slug = slugify(name);

    // Update the image if there is a new image
    if (photo) {
      productToUpdate.photo.data = fs.readFileSync(
        "uploads/" + req.file.filename
      );
      productToUpdate.photo.contentType = photo.mimetype;
    }

    // Save the updated product to the database
    await productToUpdate.save();

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
  console.log(req.params.id);
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//PAYMENT GATEWAY
//token
const brainTreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (error, response) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//PAYMENT
const brainTreePayment = async (req, res) => {
  const { cartItem, nonce } = req.body;
  const totalAmount = cartItem.reduce(
    (acc, val) => (acc = val.price * val?.selectedQty),
    0
  );
  try {
    const newTranscation = gateway.transaction.sale(
      {
        amount: totalAmount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result.success) {
          const order = new orderModel({
            products: cartItem,
            payment: result,
            buyer: req.user.user._id,
          }).save();
          res.json({ ok: true, result });
        } else {
          if (error) res.status(500).send(error);
          else res.json({ ok: false, result });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//UPDATE REVIEW
const addReview = async (req, res) => {
  const slug = req.params.slug;
  const { name, rating, comment } = req.body;
  try {
    //validation
    if (!comment)
      return res.status(400).send({
        success: false,
        message: "Review is required",
      });

    const product = await productModel.findOne({ slug }).select("-photo");
    // Add a new review to the beginning of the "reviews" array
    product.reviews.unshift({ name, rating, comment });

    //calculatre the rating of product
    const total=product.reviews.reduce((acc,val)=>acc+val.rating,0);
    product.rating=Number((total/product.reviews.length).toFixed(1));

    // Save the updated document
    await product.save();

    res.status(200).send({
      success: true,
      message: "Review is submitted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//GET ALL REVIEW OF PRODUCT AND REVIEW COUNT
const getAllReview = async (req, res) => {
  const slug = req.params.slug;
  try {
    const reviews = await productModel.find(
      { slug },
      {
        reviews: 1,
      }
    );
    const product=await productModel.findOne({slug});
    product.noOfReview=reviews[0].reviews.length;
    await product.save();
    console.log(reviews[0].reviews.length)
    res.status(200).send({
      success: true,
      message: "All review fetched",
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


export {
  createProduct,
  getAllProduct,
  getFilterProduct,
  searchProduct,
  similarProduct,
  getProductPage,
  getProductCount,
  getSingleProduct,
  getProductImage,
  updateProduct,
  deleteProduct,
  brainTreeToken,
  brainTreePayment,
  addReview,
  getAllReview,
};
