import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/ProductModel.js";

export const addProduct = asyncHandler(async(req,res,next)=>{
    try {
        const { name, description, price, category, quantity} = req.fields;
        switch (true) {
            case !name:
              return res.json({ error: "Name is required" });
            case !description:
              return res.json({ error: "Description is required" });
            case !price:
              return res.json({ error: "Price is required" });
            case !category:
              return res.json({ error: "Category is required" });
            case !quantity:
              return res.json({ error: "Quantity is required" });
          }
        const product = new Product({...req.fields})
        await product.save()
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"})
        
    }
})

export const updateProduct = asyncHandler(async(req,res,next)=>{
  try {
    const { name, description, price, category, quantity} = req.fields;
    switch(true){
      case !name :
        return res.json({error : "Name is reqyired"});
        case !description :
          return res.json({error : "Description is required"});
          case !price :
            return res.json({error : "Price is required"});
            case !category :
              return res.json({error : "Category is required"});
              case !quantity :
                return res.json({error : "Quantity is required"})
    }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new : true})
  await updatedProduct.save()
  res.status(200).json(updatedProduct)
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message)
    
  }
})

export const removeProduct = asyncHandler(async(req,res,next)=>{
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(201).json(product)
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message)
    
  }

})

export const fetchProducts = asyncHandler(async(req,res,next)=>{
  try {
    const pageSize = 6;
    const keyword = req.query.keyword ? {
      name : {
        $regex : req.query.keyword,
        $options : "i"
      },
    } : {}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize)
    res.json({
      products,
      page : 1,
      pages : Math.ceil(count/pageSize),
      hasMore: false,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({error : "Internal server error"})
    
  }
})

export const fetchProductById = asyncHandler(async(req,res,next)=>{
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(400)
      throw new Error("Product not found")
    }else{
      res.status(200).json(product)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error : "Internal server error"})
    
  }
})

export const fetchAllProducts = asyncHandler(async(req,res,next)=>{
  try {
    const products = await Product.find({})
    .populate("category")
    .limit(12)
    .sort({ createAt: -1 });
  res.status(200).json(products)
  } catch (error) {
    console.log(error);
    res.status(500).json({error : "Internal server error"})
    
  }
})

export const addProductReview = asyncHandler(async(req,res,next)=>{
  try {
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id)
    if (product) {
      const alreadyReviewed = await product.reviews.find((r)=>r.user.toString() === req.user._id.toString())
      if (alreadyReviewed) {
        res.status(400)
        throw new Error("Product already reviewed")
      }
      const review = {
        name : req.user.name,
        rating : Number(rating),
        comment,
        user : req.user._id
      }

       product.reviews.push(review)
       product.numReviews = product.reviews.length;
       product.rating = product.reviews.reduce((acc,item)=>item.rating + acc,0) / product.reviews.length
       await product.save()
       res.status(product)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error : "Internal server error"})
    
  }
})

export const fecthToProduct = asyncHandler(async(req,res,next)=>{
try {
  const product = await Product.find({}).sort({rating : -1}).limit(4)
  res.json(product)
} catch (error) {
  console.log(error);
  res.status(400).json(error.message)
  
}

})

export const fetchNewProduct = asyncHandler(async(req,res,next)=>{
  try {
    const product = await Product.find().sort({_id : -1}).limit(5)
    res.json(product)
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message)
    
  }
})

 export const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});