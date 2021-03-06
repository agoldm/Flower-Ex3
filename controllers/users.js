const bcrypt = require("bcrypt")

const { userModel } = require("../db/models/userModel")

exports.login = async (username, password) => {
    try {
        let data = await userModel.findOne({ username, password })
        if (data) return { success: true, data: data };
        return { success: false, error: true, status: 401 };
    } catch (error) {
        console.log(error);
        return { success: false, error: true, status: 500 };
    }
}

exports.register = async (user) => {
    try {

        let data = await userModel.findOne({ $or: [{ mail: user.mail }, { username: user.username }] })
        if (data) return { success: false, error: true, status: 400 };
        return exports.addUser(user)

    } catch (error) {
        console.log(error);
        return { success: false, error: true, status: 500 };
    }

}

exports.getAllUsers = async () => {
    try {
        let data = await userModel.find({})
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.addUser = async (newUser) => {
    try {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        let user = new userModel(newUser)
        let data = await user.save();
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.updateUser = async (id, user) => {
    try {
        let data = await userModel.updateOne({ _id: id }, user)
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.deleteUser = async (id) => {
    try {
        let data = await userModel.deleteOne({ _id: id })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}