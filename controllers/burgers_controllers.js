var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var burger = require('../models/burger.js')

//redirect to burger route by default
router.get('/', function(req, res) {
    res.redirect('/burgers');
});


router.get('/burgers', function(req, res) {
    burger.all(function(data) {
        res.render('index', { burgers: data });
    });
});

router.post('/burgers/create', function(req, res) {
    burger.create('burger_name', req.body.name, function() {
        res.redirect('/burgers');
    })
})

//update route
router.put('/burgers/update/devour/:id', function(req, res) {
    //tableName, column, ID, callback
    burger.update('burgers','devoured', req.params.id, function() {
        //redirect to home upon response
        res.redirect('/burgers');
    })
})


//initial load and direct
router.use(function(req, res) {
    res.redirect('/burgers');
})
//export
module.exports = router;