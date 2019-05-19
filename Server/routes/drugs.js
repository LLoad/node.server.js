var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer( { dest: 'uploads/'})

var query = require('../database/drugQuerys');

router.get('/drug_list_from_name', function(req, res) {
    query.selectDrugFromNameGet(req, res);
});
router.post('/drug_list_from_name', function(req, res) {
    query.selectDrugFromNamePost(req, res);
});

router.get('/drug_list_from_image', function(req, res) {
    console.log("asdasd");
    query.selectDrugFromImageGet(req, res);
});

router.post('/drug_list_from_image', function(req, res) {
    console.log("1");
    console.log(req.body.drugImage);
    query.selectDrugFromImagePost(req, res);
});

router.get('/drug_list_from_shape', function(req,res) {
    query.selectDrugFromShapeGet(req, res);
});
router.post('/drug_list_from_shape', function(req,res) {
    query.selectDrugFromShapePost(req, res);
});
router.get('/drug_detail', function(req, res) {
    query.selectDrugFromId(req, res);
});
router.post('/drug_detail', function(req,res) {
    query.selectDrugFromText(req, res);
});

router.get('/drug', function(req, res) {
    query.selectAll(req, res);
});

module.exports = router;