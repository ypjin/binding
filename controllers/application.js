var fs = require('fs'),
    path = require('path');


function index(req, res) {

    res.render('index', { title: 'Welcome to Node.ACS! Node version: ' + process.version});

}


function test(req, res) {

    console.log(req.params)

    var result = {};

    if(req.params.name)
        result.name = req.params.name;

    if(req.params.id)
        result.id = req.params.id;


    res.json(result);
}