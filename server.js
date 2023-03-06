const dotenv = require('dotenv')
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const bird_router = require('./routers/bird_router');
const image_router = require('./routers/image_router');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'images/' })



/* load .env */
dotenv.config();

/* create Express app */
const app = express();



/* setup Express middleware */
// Pug for SSR (static site rendering)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// TODO: middleware for parsing POST body
app.use(bodyParser.urlencoded({ extended: false }))


// TODO: middleware for uploading files
// app.post('/birds/create', upload.single('photoSource'), function (req, res, next) {
// console.log(req.files);
//   });

/* host static resources (.css, .js, ...) */
app.use('/images/', image_router);
app.use('/', express.static(path.resolve(__dirname, 'public/')));

/* redirect root route `/` to `/birds/` */
app.get('/', (req, res) => {
    res.redirect('/birds/');
});

app.use('/birds/', bird_router);


// TODO: connect to a database

const mongoose = require("mongoose");
const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PASSWORD;
const db_name = 'birds';
const db_url = `mongodb+srv://${user}:${password}@cluster0.rqafhu8.mongodb.net/${db_name}?retryWrites=true&w=majority`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(db_url, options).then(() => {
    console.log('successfully connected!')
}).catch((e) => {
    console.error(e, 'could not connect!')
});



// TODO: 404 page
app.get('/*', (request, response) => {
    response.status(404)
    response.render('404-not-found');
});
/* start the server */
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is live http://localhost:${PORT}`);
});
