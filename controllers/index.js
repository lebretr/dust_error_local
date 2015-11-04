'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    model.messages=['firstMessage','secondMessage']

    model.messagesHelper=function(chunk, context, bodies, params) {
	    if( Object.prototype.toString.call( this.messages ) === '[object Array]' ) {
	        var messages = context.get("messages");

	        messages.forEach(function(message) {
	            chunk.render(bodies.block, context.push({
	                "msgCode": message
	            }));
	        });
	    }
	}

    router.get('/', function (req, res) {
        
        res.render('index', model);
        
    });

    router.get('/ko', function (req, res) {
        
        res.render('index_ko', model);
        
    });

};
