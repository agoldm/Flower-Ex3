const { flowerModel } = require("../db/models/flowersModel")

exports.getAllFlowers = async () => {
    try {
        let data = await flowerModel.find({})
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.addFlower = async (newFlower) => {
    try {
        let flower = new flowerModel(newFlower)
        let data = await flower.save();
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.updateFlower = async (id, flower) => {
    try {
        let data = await flowerModel.updateOne({ _id: id }, flower)
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
exports.deleteFlower = async (id) => {
    try {
        let data = await flowerModel.deleteOne({ _id: id })
        return { success: true, data: data };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
