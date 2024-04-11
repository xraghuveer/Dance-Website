const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/dance", { useNewUrlParser: true });
const port = 8000;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Express middleware
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get("/", (req, res) => {
    res.render('home.pug');
});

app.get("/contact", (req, res) => {
    res.render('contact.pug');
});

app.post("/contact", (req, res) => {
    const myData = new Contact(req.body);
    myData.save()
        .then(() => {
            res.send("Saved Successfully");
        })
        .catch((err) => {
            res.status(400).send("Error in saving data: " + err);
        });
});

// Start the server
app.listen(port, () => {
    console.log(`App Started Successfully on port ${port}`);
});
