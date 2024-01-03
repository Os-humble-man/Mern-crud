const mongoose = require("mongoose");
const { departmentSchema } = require('./departments')
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },

    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    birthDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const birthDate = new Date(value);
                const now = new Date();
                const age = now.getFullYear() - birthDate.getFullYear();

                return (
                    age >= 18 ||
                    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate())
                );
            },
        },
        message: "The doctor must be aged 18 or over.",
    },
    department: {
        type: departmentSchema,
        required: true,
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 13,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
});

const Employee = mongoose.model("Employee", employeeSchema);

function validateInput(employee) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        firstName: Joi.string().required().min(3).max(50),
        departmentId: Joi.string().required(),
        birthDate: Joi.date().less("12-31-2006").default(null),
        phone: Joi.string().min(10).max(13).default(null),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
    });
    return schema.validate(employee);
}

exports.Employee = Employee;
exports.validate = validateInput;
