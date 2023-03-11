const MovieRepository = require("../repositories/movieRepository");

class MovieService {

    static findMovies = async (next) => {
        try {
            const data = await MovieRepository.findMovies(next);
            return data;
        } catch(err) {
            next(err)
        }
        
    };

    static findById = async (id, next) => {
        try {
            const data = await MovieRepository.findById(id, next);
            return data;
        } catch(err) {
            next(err);
        }
    };

    static createMovie = async (params) => {
        try {
            const data = await MovieRepository.createMovie(params, next);
            return data;
        } catch(err) {
            next(err);
        }
    };

    static updateMovie = async (params, next) => {
        try {
            
            const data = await MovieRepository.updateMovie(params, next);
            return data;
        } catch(err) {
            next(err);
        }
    };

    static deleteMovie = async (id, next) => {
        try {
            return MovieRepository.deleteMovie(id,next)
        } catch(err) {
            next(err)
        }

    };
}

module.exports = MovieService;