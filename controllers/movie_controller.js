const { ok } = require("assert");
const express = require("express");
const multer=require("multer");
const movieModel = require("../models/movies_model");

const upload = multer({
  storage: multer.diskStorage({
      destination: 'uploads/', // Specify the directory to store uploaded images
      filename: (req, body, cb) => {
          cb(null, file.originalname);
      }
  })
});


const getAllMovies = async (req, res) => {
    try {
      const allMovies = await movieModel.movieSchema.find();
      res.status(200).json(allMovies); //200=>ok
    } catch (err) {
      res.status(500).json({ message: err.message }); //500=> internal server err
    }
  };
  const getMovie=async(req,res)=>{
    try{
        const movie=await movieModel.movieSchema.findById(req.params.id);
        res.status(200).json(movie);
    }
    catch(err) {
        res.status(400).json({message:err.message});
    }
    }
    const addMovie=async(req,res)=>{
        const newMovie= new movieModel.movieSchema(
          {
              poster:`/uploads/${req.body.filename}`,
            name:req.body.name,
            description:req.body.description,
            rate:req.body.rate,
            releaseDate:req.body.releaseDate,
            categoryId:req.body.categoryId
              })
        try{
         const addedMovie=  await newMovie.save()
           res.status(201).json({
            message:"New Added Movie",
            addedMovie:addedMovie
        });
        }
        catch(err){
            res.status(500).json({message:err.message}); 
        }
    }
    const deleteMovie = async (req, res) => {
        try {
          const delMovie = await movieModel.movieSchema.findByIdAndDelete(
            req.params.id
          );
          if (!delMovie) {
            return res.status(404).json({ message: "Movie not found" });
          }
          res.status(200).json({
            message: "Movie deleted",
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      const updateMovie = async (req, res) => {
        try {
          const movie = await movieModel.movieSchema.findByIdAndUpdate(
            req.params.id,
            req.body
          );
          if (!movie) {
            return res.status(404).json({ message: "movie not found" });
          }
          const updatedMovie = await movieModel.movieSchema.findById(req.params.id);
          res.status(200).json({
            message: "updated Movie",
            updatedMovie: updatedMovie,
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      const search=async(req,res)=>{
        try{
            let searchResult=undefined;
            if(req.query.name && req.query.description){
              searchResult= await movieModel.movieSchema.find({
                  'name':{'$regex':req.query.name,'$options':'i'},
                  'description':{'$regex':req.query.description,'$options':'i'}
              });
              res.status(200).json(searchResult)
            }
           else if(req.query.name){
              searchResult= await movieModel.movieSchema.find({'name':{'$regex':req.query.name,'$options':'i'}});
              res.status(200).json(searchResult)
            }
            else if(req.query.description){
              searchResult= await movieModel.movieSchema.find({'description':{'$regex':req.query.description,'$options':'i'}});
              res.status(200).json(searchResult)
            }
        }catch(err){
            res.status(500).json({message:err.message})
        }
      }
  module.exports.getAllMovies=getAllMovies;
  module.exports.getMovie=getMovie;
  module.exports.addMovie=addMovie;
  module.exports.updateMovie=updateMovie;
  module.exports.deleteMovie=deleteMovie;
  module.exports.search=search;