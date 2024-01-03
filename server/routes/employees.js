const mongoose = require('mongoose');
const express = require('express');

const { Employee, validate } = require('../models/employees');
const { Department } = require('../models/departments');
const router = express.Router();


router.get('/', async (req, res) => {
    const employess = await Employee.find().sort('name');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.send(employess)
})

router.get('/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) return res.status(404).send('employee not found');
    res.send(employee);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const department = await Department.findById(req.body.departmentId);
    if (!department) return res.status(400).send('invalid department');

    const employee = new Employee({
        name: req.body.name,
        firstName: req.body.firstName,
        birthDate: req.body.birthDate,
        department: {
            _id: department._id,
            name: department.name

        },
        phone: req.body.phone,
        email: req.body.email
    })
    try {
        const result = await employee.save();
        res.send(`Successfully created: ${result}`);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
    console.log(req.body);
})


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const department = await Department.findById(req.body.departmentId);
    if (!department) return res.status(400).send('invalid department');
    const employee = await Employee.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            firstName: req.body.firstName,
            birthDate: req.body.birthDate,
            department: {
                _id: department._id,
                name: department.name
            },
            phone: req.body.phone,
            email: req.body.email
        }
    });
    employee.save();
    if (!employee) return res.status(400).send('employee not found')
    res.send('Sucessfully updated')
})

router.delete('/:id', async (req, res) => {
    const employee = await Employee.findByIdAndDelete({ _id: req.params.id });
    if (!employee) return res.status(400).send('employee not found');
    res.send('Sucessfully deleted')

})


module.exports = router;