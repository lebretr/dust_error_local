'use strict';

var IndexModel = require('../models/index');
var bundalo = require('bundalo');

//bundle config
var config = {
    "contentPath": "locales/", //required
    "fallback": "en-US",       //optional
    "engine": "dust",          //required
    "cache": false             //optional, default is true
};

var bundle = bundalo(config);

module.exports = function (router) {

    var model = new IndexModel();
    router.get('/', function (req, res) {
        res.render('index', model);
    });

    router.get('/ko', function (req, res) {
        model.messages=['firstMessage', 'secondMessage'];
        model.tmessages=[];
        bundle.get({'bundle': 'index_ko','locality': 'en-US', 'model': {}}, function bundaloReturn(err, data) {
            model.messages.forEach(function (message) {
                model.tmessages.push(data[message]);
            });
            res.render('index_ko', model);
        });
    });

};
