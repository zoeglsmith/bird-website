const { response } = require('express');
const express = require('express');
const { appendFile } = require('fs');
const { model } = require('mongoose');
var bird_controller = require('../controllers/bird_controller');
const bird = require('../controllers/bird_model');
const bird_model = require('../controllers/bird_model');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })


/* create a router (to export) */
const router = express.Router();

/* route the default URL: `/birds/ */
router.get('/', async (req, res) => {
    // extract the query params
    const search = req.query.search;
    const status = req.query.status;
    const sort = req.query.sort;

    // render the Pug template 'home.pug' with the filtered data
    res.render('home', {
        birds: await bird_controller.filter_bird_data(search, status, sort)
    });
})

// TODO: finishe the "Create" route(s)
router.get('/create', async (req, res) => {
    //console.log('/create, response');
    res.render('create-bird');
});

router.post('/create',upload.single('photoSource'), async (req, res) => {

    // bird_model.init() //
console.log(req.file);
    const id = {
        primary_name: req.body.pName,
        english_name: req.body.eName,
        scientific_name: req.body.sName,
        order: req.body.order,
        family: req.body.family,
        other_names: req.body.oName,
        status: req.body.status,
        photo: {
            credit: req.body.photoCred,
            source: req.file.filename,
        },
        size: {
            weight: {
                value: req.body.weight,
                units: 'g',
            },
            length: {
                value: req.body.length,
                units: 'cm',
            }
        }

    };
    console.log(id);

    const newBird = await bird_model.create(id);

    console.log(newBird, '/create');


    // If Sucessesfull
    res.redirect('/');

});



// TODO: get individual bird route(s)
//View-birds
router.get('/:id/', async (req, res) => {
    const id = req.params.id;
    const d = await bird_model.findOne({ _id: id })
    // console.log(d);
    res.render('bird-view', { bird: d });
});



// TODO: Update bird route(s)

router.get('/:id/update', async (req, res) => {
    const id = req.params.id;
    const d = await bird_model.findOne({ _id: id })
    res.render('update', { bird: d });



})

router.post('/:id/update',upload.single('photoSource'), async (req, res) => {
    console.log(req.file);

   const id = req.params.id;
    const data = {
        primary_name: req.body.pName,
        english_name: req.body.eName,
        scientific_name: req.body.sName,
        order: req.body.order,
        family: req.body.family,
        other_names: req.body.oName,
        status: req.body.status,
        photo: {
            credit: req.body.photoCred,
            source: req.file.filename,
            
        },
        size: {
            weight: {
                value: req.body.weight,
                units: 'g',
            },
            length: {
                value: req.body.length,
                units: 'cm',
            }
        }

    };


    const editBird = await bird_model.updateOne({ _id: id }, data);
   // const editBird = await bird_model.updateOne({ _id: id });
    // const editBird = await bird_model.updateOne({ _id: id });


    console.log(editBird, ':id/update, res');
    res.redirect('/');
    //console.log(data);
    console.log(req.file);

  
});



// TODO: Delete bird route(s)
router.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const d = await bird_model.findOneAndRemove({ _id: id })
    console.log(d, ':id/delete, response');
    res.redirect('/');

})

module.exports = router; // export the router