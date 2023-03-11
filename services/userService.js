const UserRepository = require("../repositories/userRepository")

class UserService {

    static findUser = async (next) => {
        try {
            const data = await UserRepository.findUser(next);
            return data;
        } catch(err) {
            next(err)
        }
        
    }

    static findById = async (id, next) => {
        try {
            const data = await UserRepository.findById(id, next);
            return data;
        } catch(err) {
            next(err);
        }
    }

    static createUser = async (params) => {
        try {
            const data = await UserRepository.createUser(params, next);
            return data;
        } catch(err) {
            next(err);
        }
    }

    static updateUser = async (id, params, next) => {
        try {
            const data = await UserRepository.updateUser(id, params, next);
            return data;
        } catch(err) {
            next(err);
        }
    }

    static deleteUser = async (id, next) => {
        try {
            return UserRepository.deleteUser(id,next)
        } catch(err) {
            next(err)
        }

    }
}

module.exports = UserService