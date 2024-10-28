const { ok } = require("assert");
const express=require("express")
const router=express.Router();
const movieModel=require('../models/movies_model')
const movieController=require('../controllers/movie_controller')
router.get('/all',movieController.getAllMovies)
router.get('/movie/:id',movieController.getMovie)
router.post('/add',movieController.addMovie)
router.delete('/delete/:id',movieController.deleteMovie)
router.put('/update/:id',movieController.updateMovie)
router.get('/search',movieController.search)
module.exports.router = router