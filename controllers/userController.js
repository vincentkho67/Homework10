const UserService = require("../services/userService")
class UserController {


    static findUser = async(req, res, next) => {
       
       try {
            const data = await UserService.findUser(next);
            res.status(200).json(data);
       } catch(err) {
        next(err);
       }
        
        
    }

    static findById = async (req, res, next) => {

        try {
            const {id} = req.params;
            const data = await UserService.findById(id, next);
            if(data) {
                res.status(200).json(data);
            } else {
                next({ name: "ErrorNotFound"});
            }
            
            
            
        } catch(err) {
            next(err);
        }
    }
    static createUser = async (req, res, next) => {
        try {
            
            const data = await UserService.createUser(req.body, next)

            res.status(201).json(data)

        } catch(err) {
            next(err)
        }
    }

    static updateUser = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {email, gender, password, role} = req.body;
    
            const updateMovies = `
                UPDATE users
                SET email = $1,
                gender = $2,
                password = $3,
                role = $4,
                WHERE id = $5;
            `
            
        } catch(err) {
            next(err)
        }
    }
    
    static deleteUser = async (req, res, next) => {
        try{
            const {id} = req.params;

            const data = await UserService.deleteUser(id, next);
            
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

module.exports = UserController;