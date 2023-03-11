const Movie = require("../models/movie");

class MovieRepository {

    static findMovies = async (next) => {
        try {
            const data = await Movie.getMovies(next)
            return data;
        } catch {
            next(err);
        }
        
    };

    static findById = async (id, next) => {
        try {
            const data = await Movie.findById(id, next)
            return data
        } catch(err){
            next(err)
        }
    };

    static createMovie = async (params, next) => {
        try {
            const data = await Movie.createMovie(params, next);
            return data;
        } catch(err) {
            next(err);
        }
    };

    static updateMovie = async (params, next) => {
        try {
            console.log("MASUK REPOSITORY")
            const movie = await Movie.updateMovie(params, next);
            if (!movie) {
                const err = new Error(`Movie with id ${params.id} not found`);
                err.status = 404;
                throw err;
            } 
            return movie;
        } catch(err) {
            next(err);
        }
    };

    static deleteMovie = async (id, next) => {
        try {
            return Movie.deleteMovie(id, next)
        } catch(err) {
            next(err)
        }
    };
};

module.exports = MovieRepository