// Load Express.
const express = require('express');
const app = express();

// Load body-parser.
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khalid:.@cluster0.bu8in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    console.log("Database Connected Successfully");
})

// Configure Endpoint
app.get('/', (req, res) => {
    res.send(`This is Orders Root Endpoint`)
})

// Load Models
require('./Order')
const Order = mongoose.model(`Order`);

// Get All Orders
app.get('/orders', (req, res) => {
    Order.find()
        .then((orders) => {
            console.log(orders)
            return res.json(orders)
        })
        .catch(err => {
            console.log(err.message)
            res.status(404).send(err.message)
        })
})

// Create Order
app.post('/order', (req, res) => {
    var order = new Order(req.body)
    order.save()
        .then(() => {
            console.log("Order Saved Successfully")
            res.send(`Order Saved Successfully`)
        }).catch((err) => {
            console.log(err)
            res.status(404)
            res.send(err.message)
        })
})

// Run Server.
const PORT = 5656;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});