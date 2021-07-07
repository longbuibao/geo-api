const Disease = require('../../models/Disease')

const findDisease = async(name) => {

    try {
        const disease = await Disease.findOne({ name })
        if (disease) {
            return disease._id
        }
        const newDisease = await (new Disease({
            name
        })).save()

        return newDisease._id
    } catch (error) {
        throw {
            path: `controllers/diseases.controller.js ${error.message}`,
            message: 'Lỗi không thể lưu tên bệnh'
        }
    }


}

module.exports = {
    findDisease
}