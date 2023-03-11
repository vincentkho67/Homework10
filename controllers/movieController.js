const MovieService = require("../services/movieServices")
class MovieController {


    static findMovies = async(req, res, next) => {
       
       try {
            const data = await MovieService.findMovies(next);
            res.status(200).json(data);
       } catch(err) {
        next(err);
       }
        
        
    }

    static findById = async (req, res, next) => {

        try {
            const {id} = req.params;
            const data = await MovieService.findById(id, next);
            if(data) {
                res.status(200).json(data);
            } else {
                next({ name: "ErrorNotFound"});
            }
            
            
            
        } catch(err) {
            next(err);
        }
    }
    static createMovie = async (req, res, next) => {
        try {
            
            const data = await MovieService.createMovie(req.body, next)

            res.status(201).json(data)

        } catch(err) {
            next(err)
        }
    }
    
    static updateMovie = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {title, genres, year} = req.body;
    
            const updateMovies = `
                UPDATE movies
                SET title = $1,
                genres = $2,
                year = $3,
                WHERE id = $4;
            `
            
        } catch(err) {
            next(err)
        }
    }
    
    static deleteMovie = async (req, res, next) => {
        try{
            const {id} = req.params;

            const data = await MovieService.deleteMovie(id, next);
            
            if(data) {
                res.status(200).json({message: "Deleted successfuly"}, data)
            } else {
                next({name: "ErrorNotFound"})
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MovieController;