var express = require('express');
var con = require('./db');
var router = express.Router();
var controller = require('./controller');

router.post('/test',function(req,res){
	controller.fun.test(req,res);
});
router.post('/logging',function(req,res){
	controller.fun.logging(req,res);
});
router.post('/quesfetch',function(req,res){
	controller.fun.quesfetch(req,res);
});
router.post('/ansupdate',function(req,res){
	controller.fun.ansupdate(req,res);
});
router.post('/userfetch',function(req,res){
	controller.fun.userfetch(req,res);
});
router.post('/resfetch',function(req,res){
	controller.fun.resfetch(req,res);
});
module.exports = router;