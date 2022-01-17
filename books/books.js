// Load Express
const express = require('express');
const app = express();

// Load body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load mongoose
const mongoose = require('mongoose');

// Load Model
require('./Book')
const Book = mongoose.model(`Book`);

// Connect to Database
mongoose.connect("mongodb+srv://khalid:.@cluster0.bu8in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
    console.log(`Database Connected Successfully.`)

    const PORT = 4545;
    app.listen(PORT, () => {
        console.log(`Books Server is running on ${PORT}!`)
    })
})

// End points
app.get('/', (req, res) => {
    res.send(`This is the root endpoint.`)
})

// Add new Book
app.post('/book', (req, res) => {
    var book = new Book(req.body);
    book.save()
        .then(() => {
            res.send("Book saved successfully.")
        })
        .catch(err => {
            console.log(err.message)
            res.status(400)
            res.send(err.message)
        })
});

// Get Books
app.get('/book', (req, res) => {
    Book.find()
        .then(books => {
            console.log(books)
            return res.json(books)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400)
            res.send(err.message)
        })

})

// Get Book
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            console.log(book)
            return res.json(book)
        })
        .catch(err => {
            console.log(err.message)
            res.status(404)
            res.send(err.message)
        })

})

// Delete Book
app.delete('/book/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send("Deleted Successfully.")
        })
        .catch(err => {
            console.log(err.message)
            res.status(404)
            res.send(err.message)
        })

})

