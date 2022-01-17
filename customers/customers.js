// Load Express
const express = require('express');
const app = express();

// Load body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load mongoose
const mongoose = require('mongoose');

// Load Model
require('./Customer')
const Customer = mongoose.model(`Customer`);

// Connect to Database
mongoose.connect(`mongodb+srv://khalid:.@cluster0.bu8in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, () => {
    console.log(`Database Connected Successfully.`)
});

// Root End point
app.get('/', (req, res) => {
    res.send("This is the server End Point")
})

// Add Customer
app.post('/customer', (req, res) => {
    var customer = new Customer(req.body);
    customer.save()
        .then(() => {
            res.send("Customer saved successfully.")
        })
        .catch(err => {
            console.log(err.message)
            res.status(400)
            res.send(err.message)
        })
})

// Get Customers
app.get('/customer', (req, res) => {
    Customer.find()
        .then(customers => {
            console.log(customers)
            return res.json(customers)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400)
            res.send(err.message)
        })

})

// Get Customer
app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            console.log(customer)
            return res.json(customer)
        })
        .catch(err => {
            console.log(err.message)
            res.status(404)
            res.send(err.message)
        })

})

// Delete Customer
app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send("Deleted Successfully.")
        })
        .catch(err => {
            console.log(err.message)
            res.status(404)
            res.send(err.message)
        })

})


const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}!`)
});