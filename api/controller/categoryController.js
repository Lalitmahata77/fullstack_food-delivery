import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../model/categoryModel.js";

export const createCategory = asyncHandler(async(req,res,next)=>{
  try {
      const {name} = req.body;
      if (!name) {
          return res.json({ error: "Name is required" });
        }
      const category = await Category.findOne({name})
      if (category) {
          return res.json({message : "Category Already exists"})
      }
      const newCategory = await new Category({name}).save()
      res.status(200).json(newCategory)
  
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
    
  }
})

export const updateCategory = asyncHandler(async(req,res,next)=>{
    try {
        const {name} = req.body;
        const {categoryId} = req.params;
        const category = await Category.findOne({_id : categoryId})
        if (!category) {
           return res.json({message : "category not found"})
        }
        category.name = name
        const updatedCategory = await category.save()
        res.status(200).json(updatedCategory)

    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
        
    }
})

export const removeCategory = asyncHandler(async(req,res,next)=>{
    try {
        const {categoryId} = req.params
        const removed = await Category.findByIdAndDelete(categoryId)
    res.status(200).json(removed)
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
        
    }

})

export const listOfCategory = asyncHandler(async(req,res,next)=>{
   try {
     const category = await Category.find({})
     res.status(200).json(category)
   } catch (error) {
    console.log(error);
    res.status(400).json(error.message)
    
   }
    
})

export const readCategory = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.id });
      res.json(category);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  });
  
  