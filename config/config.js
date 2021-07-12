const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/passport", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connection successfully")
    })
    .catch(err => console.log(err));