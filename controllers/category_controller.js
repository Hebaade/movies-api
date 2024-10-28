const { ok } = require("assert");
const express = require("express");
const categoryModel=require('../models/categories_model')
const getAllCategories = async (req, res) => {
    try {
      const allCategories = await categoryModel.categorySchema.find();
      res.status(200).json(allCategories); //200=>ok
    } catch (err) {
      res.status(500).json({ message: err.message }); //500=> internal server err
    }
  };
  const getCategory=async(req,res)=>{
    try{
        const category=await categoryModel.categorySchema.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(err) {
        res.status(400).json({message:err.message});
    }
    }

    
    const addCategory=async(req,res)=>{
        const newCategory= new categoryModel.categorySchema(
            {name:req.body.name,
                description:req.body.description})
        try{
         const addedCategory=  await newCategory.save()
           res.status(201).json({
            message:"New Added Category",
            addedCategory:addedCategory
        });
        }
        catch(err){
            res.status(500).json({message:err.message}); 
        }
    }
    const deleteCategory = async (req, res) => {
        try {
          const delCategory = await categoryModel.categorySchema.findByIdAndDelete(
            req.params.id
          );
          if (!delCategory) {
            return res.status(404).json({ message: "Category not found" });
          }
          res.status(200).json({
            message: "Category deleted",
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      const updateCategory = async (req, res) => {
        try {
          const category= await categoryModel.categorySchema.findByIdAndUpdate(
            req.params.id,
            req.body
          );
          if (!category) {
            return res.status(404).json({ message: "category not found" });
          }
          const updatedCategory = await categoryModel.categorySchema.findById(req.params.id);
          res.status(200).json({
            message: "updated Category",
            updatedCategory: updatedCategory,
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      const search=async(req,res)=>{
        try{
            let searchResult=undefined;
            if(req.query.name && req.query.description){
              searchResult= await categoryModel.categorySchema.find({
                  'name':{'$regex':req.query.name,'$options':'i'},
                  'description':{'$regex':req.query.description,'$options':'i'}
              });
              res.status(200).json(searchResult)
            }
           else if(req.query.name){
              searchResult= await categoryModel.categorySchema.find({'name':{'$regex':req.query.name,'$options':'i'}});
              res.status(200).json(searchResult)
            }
            else if(req.query.description){
              searchResult= await categoryModel.categorySchema.find({'description':{'$regex':req.query.description,'$options':'i'}});
              res.status(200).json(searchResult)
            }
        }catch(err){
            res.status(500).json({message:err.message})
        }
      }
  module.exports.getAllCategories=getAllCategories;
  module.exports.getCategory=getCategory;
  module.exports.addCategory=addCategory;
  module.exports.updateCategory=updateCategory;
  module.exports.deleteCategory=deleteCategory;
  module.exports.search=search;