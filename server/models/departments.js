const mongoose = require("mongoose");
const Joi = require("joi");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        default: null,
    }
});

const Department = mongoose.model('Department', departmentSchema);

function validate(department) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    })

    return schema.validate(department)
}

exports.Department = Department;
exports.departmentSchema = departmentSchema;
exports.validate = validate;

