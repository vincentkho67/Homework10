const User = require("../models/users")

class UserRepository {

    static findUser = async (next) => {
        try {
            const data = await User.getUser(next)
            return data;
        } catch {
            next(err);
        }
        
    }

    static findById = async (id, next) => {
        try {
            const data = await User.findById(id, next)
            return data
        } catch(err){
            next(err)
        }
    }

    static createUser = async (params, next) => {
        try {
            const data = await User.createUser(params, next);
            return data;
        } catch(err) {
            next(err);
        }
    }

    static updateUser = async (id, params, next) => {
        try {
            const user = await User.findById(id, next);
            if (!user) {
                const err = new Error(`User with id ${id} not found`);
                err.status = 404;
                throw err;
            }
            Object.assign(user, params);
            const updatedUser = await user.save();
            return updatedUser;
        } catch(err) {
            next(err);
        }
    }

    static deleteUser = async (id, next) => {
        try {
            return User.deleteUser(id, next)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserRepository