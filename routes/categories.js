const { ok } = require("assert");
const express=require("express")
const router=express.Router();
const categoryModel=require('../models/categories_model')
const categoryController=require('../controllers/category_controller')
router.get('/all',categoryController.getAllCategories)
router.post('/add',categoryController.addCategory)
router.delete('/delete/:id',categoryController.deleteCategory)
router.put('/update/:id',categoryController.updateCategory)
router.get('/search',categoryController.search)
router.get('/category/:id',categoryController.getCategory)
module.exports.router = router