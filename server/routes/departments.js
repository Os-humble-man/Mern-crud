const express = require('express');


const { Department, validate } = require('../models/departments');
const router = express.Router();

router.get('/', async (req, res) => {
    const departements = await Department.find().sort('name');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.send(departements);
})

router.get('/:id', async (req, res) => {
    const departements = await Department.findById(req.params.id);
    if (!departements) return res.status(404).send('department not found');
    res.send(departements)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const department = new Department({
        name: req.body.name
    })
    try {
        const result = await department.save();
        console.log(result);
        res.send('Successfully create')
    } catch (error) {
        console.log(error.message);
    }

    console.log(req.body);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(400).send('departement not found');
    department.name = req.body.name;
    const result = await department.save();
    console.log(result);
    res.send('Sucessfully update')
})

router.delete('/:id', async (req, res) => {
    const department = await Department.findByIdAndDelete({ _id: req.params.id });
    if (!department) return res.status(400).send('departement not found');
    res.send('delete sucessfully')

})

module.exports = router;