const mongoose = require('mongoose');

mongoose.model("Book", {
    // title, author, numberPages, publisher
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    numberPages: {
        type: Number,
        required: false
    },
    publisher: {
        type: String,
        required: false
    },
})